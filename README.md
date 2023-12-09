# baxter_robot_archreactor
WIFI
SSID: Baxter or Baxter-5G
SSID_Password: 12345678
user: admin
password: 12345678

SSH with sudo access in Baxter
ssh ruser@192.168.8.221
Login: ruser
Password: rethink

SSH into Jetson Nano
ssh robot@192.168.8.137
Login: robot
Passowrd: robot

To run commands
source ~/catkin_ws/devel/setup.bash

rosrun baxter_interface joint_trajectory_action_server.py

rosrun baxter_examples joint_position_keyboard.py

rosrun baxter_examples joint_trajectory_client.py -l left

# arm_rotate, sholder, sholder_rotate, elbow, forarm, wrist, hand
        'left':  [0.0, 0.0, 0.0, 0.0,  0.0, 0.0,  0.0],
        'right':  [0.11, -0.62,  1.15, 1.32, -0.80, 1.27, -2.39],
python arm_control.py -p 0.0 0.0 0.0 0.0 0.0 0.0 0.0 -l left