import { PrismaClient } from "../generated/prisma/index.js";


const prisma = new PrismaClient();

// Function to get admin data analytics

export const getAdminAnalytics = async (req, res) => {

    try {
        
        const totalUsers = await prisma.user.count();
        const totalOrders = await prisma.order.count();
        const totalDishes = await prisma.dish.count();
        const totalReviews = await prisma.review.count();

        const totalRevenue = await prisma.order.aggregate({
            _sum: {
                total: true,
            },
        });
        const totalRevenueAmount = totalRevenue._sum.total || 0;

        const statusCounts = await prisma.order.groupBy({
            by: ['status'],
            _count: {
                status: true,
            },
        });

        const pastWeekOrders = await prisma.order.findMany({
        where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
      },
      select: {
        createdAt: true
      }
    });

      const ordersPerDay = Array(7).fill(0);
        pastWeekOrders.forEach((order) => {
      const dayIndex = 6 - Math.floor((new Date() - order.createdAt) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex <= 6) {
        ordersPerDay[dayIndex]++;
      }
    });

    return res.status(200).json({
      totalUsers,
      totalDishes,
      totalOrders,
      totalRevenue,
      orderStatusStats: statusCounts,
      ordersPerDay: ordersPerDay.reverse()
    });


    } catch (error) {
        console.error("Error fetching admin analytics:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }


}