import 'package:flutter/material.dart';

class RobotEye extends StatefulWidget {
  RobotEye({Key? key}) : super(key: key);

  @override
  RobotEyeState createState() => RobotEyeState();
}

class RobotEyeState extends State<RobotEye> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 5000),
      vsync: this,
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

@override
Widget build(BuildContext context) {
  return Container(
    width: 250,
    height: 250,
    decoration: BoxDecoration(
      shape: BoxShape.circle,
      color: Colors.grey,
      border: Border.all(
        color: Colors.black,
        width: 10.0,
      ),
    ),
    child: Center(
      child: SlideTransition(
        position: Tween<Offset>(
          begin: Offset.zero,
          end: const Offset(0.9, 0.9),
        ).animate(CurvedAnimation(
          parent: _controller,
          curve: Curves.elasticIn,
        )),
        child: Container(
          width: 50.0,
          height: 50.0,
          decoration: const BoxDecoration(
            shape: BoxShape.rectangle,
            color: Colors.black,
          ),
        ),
      ),
    ),
  );
}
}