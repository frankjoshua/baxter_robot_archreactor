# baxter_robot_archreactor

Login: ruser
Password: rethink

source ~/catkin_ws/devel/setup.bash

rosrun baxter_interface joint_trajectory_action_server.py

rosrun baxter_examples joint_position_keyboard.py
