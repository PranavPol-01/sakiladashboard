const pool = require("./db");

const resolvers = {
  Query: {
    getTopRentedFilms: async (_, { storeId, startDate, endDate }) => {
      let query = `
        SELECT f.film_id as "filmId", f.title, COUNT(r.rental_id) as "rentalCount"
        FROM film f
        JOIN inventory i ON f.film_id = i.film_id
        JOIN rental r ON i.inventory_id = r.inventory_id
        WHERE 1=1
      `;
      const params = [];
      let paramIndex = 1;

      if (storeId) {
        query += ` AND i.store_id = $${paramIndex}`;
        params.push(storeId);
        paramIndex++;
      }

      if (startDate) {
        query += ` AND r.rental_date >= $${paramIndex}`;
        params.push(startDate);
        paramIndex++;
      }

      if (endDate) {
        query += ` AND r.rental_date <= $${paramIndex}`;
        params.push(endDate);
        paramIndex++;
      }

      query += ` GROUP BY f.film_id, f.title ORDER BY "rentalCount" DESC LIMIT 5`;

      try {
        const result = await pool.query(query, params);
        return result.rows;
      } catch (error) {
        console.error("Error fetching top rented films:", error);
        throw error;
      }
    },

    getRevenueByCategory: async (_, { storeId, startDate, endDate }) => {
      let query = `
        WITH category_revenue AS (
          SELECT c.name as category_name, SUM(p.amount) as revenue
          FROM category c
          JOIN film_category fc ON c.category_id = fc.category_id
          JOIN film f ON fc.film_id = f.film_id
          JOIN inventory i ON f.film_id = i.film_id
          JOIN rental r ON i.inventory_id = r.inventory_id
          JOIN payment p ON r.rental_id = p.rental_id
          WHERE 1=1
      `;
      const params = [];
      let paramIndex = 1;

      if (storeId) {
        query += ` AND i.store_id = $${paramIndex}`;
        params.push(storeId);
        paramIndex++;
      }

      if (startDate) {
        query += ` AND p.payment_date >= $${paramIndex}`;
        params.push(startDate);
        paramIndex++;
      }

      if (endDate) {
        query += ` AND p.payment_date <= $${paramIndex}`;
        params.push(endDate);
        paramIndex++;
      }

      query += `
          GROUP BY c.name
        ),
        total_revenue AS (
          SELECT SUM(revenue) as total FROM category_revenue
        )
        SELECT 
          cr.category_name as "categoryName",
          cr.revenue,
          ROUND((cr.revenue / tr.total * 100)::numeric, 2) as percentage
        FROM category_revenue cr, total_revenue tr
        ORDER BY cr.revenue DESC
      `;

      try {
        const result = await pool.query(query, params);
        return result.rows.map((row) => ({
          categoryName: row.categoryName,
          revenue: parseFloat(row.revenue),
          percentage: parseFloat(row.percentage),
        }));
      } catch (error) {
        console.error("Error fetching revenue by category:", error);
        throw error;
      }
    },

    getTopCustomers: async (_, { storeId, startDate, endDate }) => {
      let query = `
        SELECT 
          c.customer_id as "customerId",
          CONCAT(c.first_name, ' ', c.last_name) as "fullName",
          COUNT(r.rental_id) as "totalRentals",
          COALESCE(SUM(p.amount), 0) as "totalSpent"
        FROM customer c
        LEFT JOIN rental r ON c.customer_id = r.customer_id
        LEFT JOIN payment p ON r.rental_id = p.rental_id
        LEFT JOIN inventory i ON r.inventory_id = i.inventory_id
        WHERE 1=1
      `;
      const params = [];
      let paramIndex = 1;

      if (storeId) {
        query += ` AND c.store_id = $${paramIndex}`;
        params.push(storeId);
        paramIndex++;
      }

      if (startDate) {
        query += ` AND p.payment_date >= $${paramIndex}`;
        params.push(startDate);
        paramIndex++;
      }

      if (endDate) {
        query += ` AND p.payment_date <= $${paramIndex}`;
        params.push(endDate);
        paramIndex++;
      }

      query += `
        GROUP BY c.customer_id, c.first_name, c.last_name
        ORDER BY "totalSpent" DESC
        LIMIT 10
      `;

      try {
        const result = await pool.query(query, params);
        return result.rows.map((row) => ({
          customerId: row.customerId,
          fullName: row.fullName,
          totalRentals: parseInt(row.totalRentals),
          totalSpent: parseFloat(row.totalSpent),
        }));
      } catch (error) {
        console.error("Error fetching top customers:", error);
        throw error;
      }
    },

    getKeyMetrics: async (_, { storeId, startDate, endDate }) => {
      let revenueQuery = `
        SELECT COALESCE(SUM(p.amount), 0) as total_revenue
        FROM payment p
        JOIN rental r ON p.rental_id = r.rental_id
        JOIN inventory i ON r.inventory_id = i.inventory_id
        WHERE 1=1
      `;
      const revenueParams = [];
      let paramIndex = 1;

      if (storeId) {
        revenueQuery += ` AND i.store_id = $${paramIndex}`;
        revenueParams.push(storeId);
        paramIndex++;
      }

      if (startDate) {
        revenueQuery += ` AND p.payment_date >= $${paramIndex}`;
        revenueParams.push(startDate);
        paramIndex++;
      }

      if (endDate) {
        revenueQuery += ` AND p.payment_date <= $${paramIndex}`;
        revenueParams.push(endDate);
        paramIndex++;
      }

      let activeRentalsQuery = `
        SELECT COUNT(*) as active_rentals
        FROM rental r
        JOIN inventory i ON r.inventory_id = i.inventory_id
        WHERE r.return_date IS NULL
      `;
      const activeRentalsParams = [];
      paramIndex = 1;

      if (storeId) {
        activeRentalsQuery += ` AND i.store_id = $${paramIndex}`;
        activeRentalsParams.push(storeId);
        paramIndex++;
      }

      if (startDate) {
        activeRentalsQuery += ` AND r.rental_date >= $${paramIndex}`;
        activeRentalsParams.push(startDate);
        paramIndex++;
      }

      if (endDate) {
        activeRentalsQuery += ` AND r.rental_date <= $${paramIndex}`;
        activeRentalsParams.push(endDate);
        paramIndex++;
      }

      try {
        const revenueResult = await pool.query(revenueQuery, revenueParams);
        const activeRentalsResult = await pool.query(
          activeRentalsQuery,
          activeRentalsParams
        );

        return {
          totalRevenue: parseFloat(revenueResult.rows[0].total_revenue),
          activeRentals: parseInt(activeRentalsResult.rows[0].active_rentals),
        };
      } catch (error) {
        console.error("Error fetching key metrics:", error);
        throw error;
      }
    },

    getRecentTransactions: async (_, { storeId, startDate, endDate }) => {
      let query = `
        SELECT 
          p.payment_id as "paymentId",
          CONCAT(c.first_name, ' ', c.last_name) as "customerName",
          f.title as "filmTitle",
          p.amount,
          p.payment_date as "paymentDate"
        FROM payment p
        JOIN customer c ON p.customer_id = c.customer_id
        JOIN rental r ON p.rental_id = r.rental_id
        JOIN inventory i ON r.inventory_id = i.inventory_id
        JOIN film f ON i.film_id = f.film_id
        WHERE 1=1
      `;
      const params = [];
      let paramIndex = 1;

      if (storeId) {
        query += ` AND i.store_id = $${paramIndex}`;
        params.push(storeId);
        paramIndex++;
      }

      if (startDate) {
        query += ` AND p.payment_date >= $${paramIndex}`;
        params.push(startDate);
        paramIndex++;
      }

      if (endDate) {
        query += ` AND p.payment_date <= $${paramIndex}`;
        params.push(endDate);
        paramIndex++;
      }

      query += ` ORDER BY p.payment_date DESC LIMIT 20`;

      try {
        const result = await pool.query(query, params);
        return result.rows.map((row) => ({
          paymentId: row.paymentId,
          customerName: row.customerName,
          filmTitle: row.filmTitle,
          amount: parseFloat(row.amount),
          paymentDate: row.paymentDate.toISOString(),
        }));
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
