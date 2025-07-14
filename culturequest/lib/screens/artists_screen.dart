import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../widgets/artist_card.dart';
import 'artist_profile_screen.dart';

class ArtistsScreen extends StatefulWidget {
  const ArtistsScreen({super.key});

  @override
  State<ArtistsScreen> createState() => _ArtistsScreenState();
}

class _ArtistsScreenState extends State<ArtistsScreen> {
  String _selectedCategory = 'All';
  final List<String> _categories = [
    'All',
    'Painters',
    'Sculptors',
    'Musicians',
    'Dancers',
    'Writers'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Artists'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () => Navigator.pushNamed(context, '/search'),
          ),
        ],
      ),
      body: Column(
        children: [
          // Category filter
          Container(
            height: 50,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _categories.length,
              itemBuilder: (context, index) {
                final category = _categories[index];
                final isSelected = category == _selectedCategory;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(category),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() {
                        _selectedCategory = category;
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

          // Artists grid
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 0.8,
              ),
              itemCount: 20,
              itemBuilder: (context, index) {
                return ArtistCard(
                  name: _getArtistName(index),
                  specialty: _getArtistSpecialty(index),
                  location: _getArtistLocation(index),
                  imageUrl: _getArtistImage(index),
                  rating: _getArtistRating(index),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ArtistProfileScreen(
                          name: _getArtistName(index),
                          specialty: _getArtistSpecialty(index),
                          location: _getArtistLocation(index),
                          imageUrl: _getArtistImage(index),
                          rating: _getArtistRating(index),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  String _getArtistName(int index) {
    final names = [
      'Kwame Asante',
      'Amina Hassan',
      'Olumide Adebayo',
      'Fatima Al-Zahra',
      'Kofi Mensah',
      'Aisha Okonkwo',
      'Mamadou Diallo',
      'Zara Kone',
      'Tunde Bakare',
      'Nkem Okoro',
    ];
    return names[index % names.length];
  }

  String _getArtistSpecialty(int index) {
    final specialties = [
      'Traditional Painter',
      'Sculptor',
      'Musician',
      'Textile Artist',
      'Drummer',
      'Dancer',
      'Storyteller',
      'Photographer',
      'Craftsperson',
      'Writer',
    ];
    return specialties[index % specialties.length];
  }

  String _getArtistLocation(int index) {
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

  String _getArtistImage(int index) {
    final images = [
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/6200343/pexels-photo-6200343.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    return images[index % images.length];
  }

  double _getArtistRating(int index) {
    final ratings = [4.8, 4.5, 4.9, 4.3, 4.7, 4.6, 4.4, 4.8, 4.2, 4.9];
    return ratings[index % ratings.length];
  }
}
