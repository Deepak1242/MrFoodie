
import { Prisma } from "../generated/prisma";
// import { Prisma } from "@prisma/client";


const prisma = new Prisma.Client();

// ----------- CREATE ORDER ------------
export const placeOrder = async (req, res)=>{

    try {
    
    const user = req.user; // user will be set by authUserMiddleware

    if (!user) {
        return res.status(401).json({ message: "Unauthorized access "});

    }

    // Extracting order details from request body

    const { items, address, paymentId} = req.body;

    if (!user || !items || !address || !paymentId ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // Validate the items array
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Items must be a non-empty array" });
    }
    // Validate each item in the items array
    for (const item of items) {
        if (!item.dishId || !item.quantity || item.quantity <= 0) {
            return res.status(400).json({ message: "Each item must have a valid dishId and quantity greater than 0" });
        }
    }
    
    // Calculate total price
    let total = 0;
    const orderItems = [];

    for (const item of items){
       const orderItem =  await prisma.OrderItem.findUnique({
            where : {
                dishId : item.dishId
            }
        })

        if (!orderItem) {
            return res.status(404).json({ message: `Dish with ID ${item.dishId} not found` });
        }
        const mtotal  = orderItem.price * item.quantity;

        total += mtotal;

        orderItems.push({
            dishId: item.dishId,
            quantity: item.quantity,
            quantity: item.quantity,
        });

    }


    const newOrder = await prisma.order.create({
        data:{
            userId: user.id,
            items: {
                create: orderItems,
            } ,
            total: total,
            address,
            paymentId,
        },
        include: {
            user: true,
            items: true,
            total: true,
        }
    
    })
    
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }

}

// ----------- GET ALL ORDERS ------------
export const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                items: true,
                total: true,
                items: {
                    include:{
                        dish : true, // Include dish details in each order item
                    }
                }
            },
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// ----------- GET ORDER BY USER ID ------------

export const getOrdersByUserId = async (req, res) => {

    try {
        const userId = req.user.id; // Assuming user is set by authUserMiddleware

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                user: true,
                items: true,
                total: true,
            },
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders by user ID:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }



}

// ----------- GET ORDER BY ID ------------//

export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: true,
                items: true,
                total: true,
            },
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// ----------- UPDATE ORDER ------------//
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const {status,paymentStatus } = req.body;

    try {
        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                status,
                paymentStatus,
            },
            include: {
                user: true,
                items: true,
                total: true,
            },
        });

        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// ----------- DELETE ORDER ------------//
export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.order.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}   
