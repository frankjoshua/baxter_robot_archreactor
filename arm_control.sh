#!/bin/bash
source /home/ruser/catkin_ws/devel/setup.bash
python /home/ruser/catkin_ws/src/baxter_examples/scripts/arm_control.py "$@"
