import Signup from '../../controllers/userController';
const userRoute = router => {
  router
    .route('/user/signup')

    /**
     * @swagger
     * components:
     *  schemas:
     *    User:
     *      properties:
     *        email:
     *          type: string
     *        password:
     *          type: string
     *        firstName:
     *          type: string
     *        lastName:
     *         type: string
     *        phoneNo:
     *          type: string
     */

    /**
     * @swagger
     * /api/v1/user/signup:
     *   post:
     *     tags:
     *       - Users
     *     description: Create a new user account
     *     produces:
     *       - application/json
     *     requestBody:
     *      description: User data object
     *      required: true
     *      content:
     *       application/json:
     *          schema:
     *            $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: User created successfully
     *       500:
     *         description: Internal Server error
     */

    .post(signUp);
};
export default userRoute;
