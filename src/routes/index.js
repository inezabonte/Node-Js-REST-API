import Util from '../utils/response';
import userRoute from './api/user';
const util = new Util();

const routes = router => {
  router
    .route('/')
    /**
     * @swagger
     * /api/v1:
     *   get:
     *     tags:
     *      - name: Welcome Message Endpoint
     *     summary: Welcome message endpoint
     *     description: Endpoint returns welcome message
     *     responses:
     *      200:
     *        description: Successful operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/welcomeResponse'
     * components:
     *   schemas:
     *     welcomeResponse:
     *       type: object
     *       properties:
     *         status:
     *           type: string
     *         data:
     *           type: object
     *           properties:
     *             message:
     *               type: string
     */
    .get(
      (req, res) =>
        util.setSuccess(200, 'Successfully retrieved a user profile', data),
      util.send(res)
    );

  // user routes
  userRoute(router);
};

export default routes;
