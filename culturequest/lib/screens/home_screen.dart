import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../constants/app_text_styles.dart';
import '../widgets/bottom_navigation.dart';
import '../widgets/featured_card.dart';
import '../widgets/category_chip.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Explore Your Roots'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () => Navigator.pushNamed(context, '/search'),
          ),
          IconButton(
            icon: const Icon(Icons.favorite_border),
            onPressed: () => Navigator.pushNamed(context, '/favorites'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome section
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Welcome back!',
                    style: AppTextStyles.heading1,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Discover amazing African culture today',
                    style: AppTextStyles.bodyLarge.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),

            // Categories
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Categories',
                    style: AppTextStyles.heading1.copyWith(fontSize: 20),
                  ),
                  const SizedBox(height: 12),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        CategoryChip(
                          label: 'Events',
                          icon: Icons.event,
                          onTap: () => Navigator.pushNamed(context, '/events'),
                        ),
                        const SizedBox(width: 8),
                        CategoryChip(
                          label: 'Artists',
                          icon: Icons.palette,
                          onTap: () => Navigator.pushNamed(context, '/artists'),
                        ),
                        const SizedBox(width: 8),
                        CategoryChip(
                          label: 'Stories',
                          icon: Icons.book,
                          onTap: () => Navigator.pushNamed(context, '/stories'),
                        ),
                        const SizedBox(width: 8),
                        CategoryChip(
                          label: 'Music',
                          icon: Icons.music_note,
                          onTap: () {},
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Featured content
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Featured',
                    style: AppTextStyles.heading1.copyWith(fontSize: 20),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 200,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      children: [
                        FeaturedCard(
                          title: 'African Art Festival',
                          subtitle: 'Lagos, Nigeria',
                          imageUrl:
                              'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
                          onTap: () {},
                        ),
                        const SizedBox(width: 12),
                        FeaturedCard(
                          title: 'Traditional Music Concert',
                          subtitle: 'Accra, Ghana',
                          imageUrl:
                              'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
                          onTap: () {},
                        ),
                        const SizedBox(width: 12),
                        FeaturedCard(
                          title: 'Cultural Heritage Tour',
                          subtitle: 'Cape Town, South Africa',
                          imageUrl:
                              'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400',
                          onTap: () {},
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Recent stories
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Recent Stories',
                    style: AppTextStyles.heading1.copyWith(fontSize: 20),
                  ),
                  const SizedBox(height: 12),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: 3,
                    itemBuilder: (context, index) {
                      final stories = [
                        {
                          'title': 'The Art of Kente Weaving',
                          'author': 'Kwame Asante',
                          'time': '2 hours ago',
                        },
                        {
                          'title': 'Traditional Drumming Techniques',
                          'author': 'Amina Hassan',
                          'time': '5 hours ago',
                        },
                        {
                          'title': 'Ancient African Architecture',
                          'author': 'Olumide Adebayo',
                          'time': '1 day ago',
                        },
                      ];

                      final story = stories[index];
                      return ListTile(
                        leading: CircleAvatar(
                          backgroundColor: AppColors.accent,
                          child: Text(
                            story['author']![0],
                            style: const TextStyle(color: Colors.white),
                          ),
                        ),
                        title: Text(story['title']!),
                        subtitle: Text('${story['author']} • ${story['time']}'),
                        onTap: () => Navigator.pushNamed(context, '/stories'),
                      );
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 100),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigation(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
          _navigateToScreen(context, index);
        },
      ),
    );
  }

  void _navigateToScreen(BuildContext context, int index) {
    switch (index) {
      case 0:
        // Already on home
        break;
      case 1:
        Navigator.pushNamed(context, '/explore');
        break;
      case 2:
        Navigator.pushNamed(context, '/events');
        break;
      case 3:
        Navigator.pushNamed(context, '/profile');
        break;
    }
  }
}
