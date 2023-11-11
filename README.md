# baxter_robot_archreactor

Login: ruser
Password: rethink

source ~/catkin_ws/devel/setup.bash

rosrun baxter_interface joint_trajectory_action_server.py

rosrun baxter_examples joint_position_keyboard.py

rosrun baxter_examples joint_trajectory_client.py -l left

# arm_rotate, sholder, sholder_rotate, elbow, forarm, wrist, hand
        'left':  [0.0, 0.0, 0.0, 0.0,  0.0, 0.0,  0.0],
        'right':  [0.11, -0.62,  1.15, 1.32, -0.80, 1.27, -2.39],
