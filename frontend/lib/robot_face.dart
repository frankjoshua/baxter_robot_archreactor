import 'package:flutter/material.dart';
import 'package:frontend/robot_eye.dart';

class RobotFace extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: double.infinity, // set height to match parent
      width: double.infinity, // set width to match parent
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          RobotEye(),
          SizedBox(width: 50.0), // Add some space between the eyes
          RobotEye(),
        ],
      ),
    );
  }
}