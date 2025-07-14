import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../widgets/bottom_navigation.dart';
import '../widgets/event_card.dart';
import 'event_details.dart';

class EventsScreen extends StatefulWidget {
  const EventsScreen({super.key});

  @override
  State<EventsScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsScreen> {
  int _currentIndex = 2;
  String _selectedFilter = 'All';

  final List<String> _filters = ['All', 'This Week', 'This Month', 'Upcoming'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Events'),
        actions: [
          IconButton(
            icon: const Icon(Icons.calendar_today),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // Filter tabs
          Container(
            height: 50,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _filters.length,
              itemBuilder: (context, index) {
                final filter = _filters[index];
                final isSelected = filter == _selectedFilter;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(filter),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() {
                        _selectedFilter = filter;
                      });
                    },
                    backgroundColor: Colors.grey[100],
                    selectedColor: AppColors.primary.withOpacity(0.2),
                    labelStyle: TextStyle(
                      color: isSelected
                          ? AppColors.primary
                          : AppColors.textSecondary,
                      fontWeight:
                          isSelected ? FontWeight.w600 : FontWeight.normal,
                    ),
                  ),
                );
              },
            ),
          ),

          // Events list
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: 10,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: EventCard(
                    title: _getEventTitle(index),
                    date: _getEventDate(index),
                    location: _getEventLocation(index),
                    imageUrl: _getEventImage(index),
                    price: _getEventPrice(index),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => EventDetailsScreen(
                            title: _getEventTitle(index),
                            date: _getEventDate(index),
                            location: _getEventLocation(index),
                            imageUrl: _getEventImage(index),
                            price: _getEventPrice(index),
                          ),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
          ),
        ],
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

  String _getEventTitle(int index) {
    final titles = [
      'African Art Festival',
      'Traditional Music Concert',
      'Cultural Heritage Tour',
      'Kente Weaving Workshop',
      'Drumming Circle',
      'African Cuisine Cooking Class',
      'Storytelling Evening',
      'Dance Performance',
      'Craft Market',
      'Photography Exhibition',
    ];
    return titles[index % titles.length];
  }

  String _getEventDate(int index) {
    final dates = [
      'Dec 15, 2024',
      'Dec 18, 2024',
      'Dec 20, 2024',
      'Dec 22, 2024',
      'Dec 25, 2024',
      'Dec 28, 2024',
      'Jan 2, 2025',
      'Jan 5, 2025',
      'Jan 8, 2025',
      'Jan 12, 2025',
    ];
    return dates[index % dates.length];
  }

  String _getEventLocation(int index) {
    final locations = [
      'Lagos, Nigeria',
      'Accra, Ghana',
      'Cape Town, South Africa',
      'Nairobi, Kenya',
      'Dakar, Senegal',
      'Addis Ababa, Ethiopia',
      'Marrakech, Morocco',
      'Cairo, Egypt',
      'Kampala, Uganda',
      'Harare, Zimbabwe',
    ];
    return locations[index % locations.length];
  }

  String _getEventImage(int index) {
    final images = [
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/6200343/pexels-photo-6200343.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    return images[index % images.length];
  }

  String _getEventPrice(int index) {
    final prices = [
      'Free',
      '\$25',
      '\$15',
      '\$30',
      '\$20',
      '\$35',
      'Free',
      '\$40',
      '\$18',
      '\$22'
    ];
    return prices[index % prices.length];
  }

  void _navigateToScreen(BuildContext context, int index) {
    switch (index) {
      case 0:
        Navigator.pushReplacementNamed(context, '/home');
        break;
      case 1:
        Navigator.pushReplacementNamed(context, '/explore');
        break;
      case 2:
        // Already on events
        break;
      case 3:
        Navigator.pushReplacementNamed(context, '/profile');
        break;
    }
  }
}
