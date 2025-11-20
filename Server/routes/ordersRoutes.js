const router = require("express").Router();
const orderController = require("../controllers/ordersController");
const { authAdmin } = require("../middlewares/auth");

// check the authAdmin routes
router.post('/', orderController.createOrder);
router.get('/pending/user/:userId', orderController.getPendingOrderForUser);
router.get('/', orderController.getOrders);
router.put('/pending/user/:userId', authAdmin, orderController.updateOrder);
router.put('/:id/status', authAdmin, orderController.updateOrderStatus);

router.get('/:id', orderController.getOrderById);

module.exports = router;