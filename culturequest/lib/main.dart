import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'screens/login_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/welcome_screen.dart';
import 'screens/home_screen.dart';
import 'screens/explore_screen.dart';
import 'screens/events_screen.dart';
import 'screens/artists_screen.dart';
import 'screens/stories_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/search_screen.dart';
import 'screens/favorites_screen.dart';

void main() {
  runApp(const ExploreYourRootsApp());
}

class ExploreYourRootsApp extends StatelessWidget {
  const ExploreYourRootsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Explore Your Roots',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.brown,
        fontFamily: 'PlusJakartaSans',
        scaffoldBackgroundColor: Colors.white,
        appBarTheme: const AppBarTheme(
          systemOverlayStyle: SystemUiOverlayStyle.dark,
          backgroundColor: Colors.white,
          foregroundColor: Color(0xFF161411),
          elevation: 0,
        ),
      ),
      home: const WelcomeScreen(),
      routes: {
        '/home': (context) => const HomeScreen(),
        '/explore': (context) => const ExploreScreen(),
        '/events': (context) => const EventsScreen(),
        '/artists': (context) => const ArtistsScreen(),
        '/stories': (context) => const StoriesScreen(),
        '/profile': (context) => const ProfileScreen(),
        '/search': (context) => const SearchScreen(),
        '/favorites': (context) => const FavoritesScreen(),
      },
    );
  }
}
