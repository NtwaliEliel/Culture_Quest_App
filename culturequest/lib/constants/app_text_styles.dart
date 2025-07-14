import 'package:flutter/material.dart';
import '../constants/app_colors.dart';

class AppTextStyles {
  static const String fontFamily = 'PlusJakartaSans';

  static const TextStyle heading1 = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    height: 1.25,
    color: AppColors.textPrimary,
    fontFamily: fontFamily,
  );

  static const TextStyle bodyLarge = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    height: 1.5,
    color: AppColors.textPrimary,
    fontFamily: fontFamily,
  );

  static const TextStyle buttonText = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    fontFamily: fontFamily,
  );

  static const TextStyle dialogTitle = TextStyle(
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
    fontFamily: fontFamily,
  );

  static const TextStyle dialogContent = TextStyle(
    color: AppColors.textPrimary,
    fontFamily: fontFamily,
  );
}
