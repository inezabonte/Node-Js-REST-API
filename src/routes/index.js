import userRoute from './api/user';
import response from '../utils/responses';

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
    .get((req, res) =>
      response(res, 200, 'success', {
        message: 'Welcome simple nodejs  API (version 1)',
      })
    );

  // user routes
  userRoute(router);
};

export default routes;
