import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../widgets/story_card.dart';
import 'story_details.dart';

class StoriesScreen extends StatefulWidget {
  const StoriesScreen({super.key});

  @override
  State<StoriesScreen> createState() => _StoriesScreenState();
}

class _StoriesScreenState extends State<StoriesScreen> {
  String _selectedCategory = 'All';
  final List<String> _categories = [
    'All',
    'History',
    'Culture',
    'Art',
    'Music',
    'Traditions'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stories'),
        actions: [
          IconButton(
            icon: const Icon(Icons.bookmark_border),
            onPressed: () {},
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

          // Stories list
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: 15,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: StoryCard(
                    title: _getStoryTitle(index),
                    author: _getStoryAuthor(index),
                    readTime: _getStoryReadTime(index),
                    excerpt: _getStoryExcerpt(index),
                    imageUrl: _getStoryImage(index),
                    publishedAt: _getStoryPublishedAt(index),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => StoryDetailsScreen(
                            title: _getStoryTitle(index),
                            author: _getStoryAuthor(index),
                            readTime: _getStoryReadTime(index),
                            content: _getStoryContent(index),
                            imageUrl: _getStoryImage(index),
                            publishedAt: _getStoryPublishedAt(index),
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
    );
  }

  String _getStoryTitle(int index) {
    final titles = [
      'The Art of Kente Weaving',
      'Traditional Drumming Techniques',
      'Ancient African Architecture',
      'The History of Adinkra Symbols',
      'African Storytelling Traditions',
      'The Beauty of Mud Cloth',
      'Sacred Masks and Their Meanings',
      'Traditional African Cuisine',
      'The Role of Griots in Society',
      'African Dance Forms',
      'The Significance of Baobab Trees',
      'Traditional Healing Practices',
      'African Musical Instruments',
      'The Art of Pottery Making',
      'Cultural Festivals Across Africa',
    ];
    return titles[index % titles.length];
  }

  String _getStoryAuthor(int index) {
    final authors = [
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
    return authors[index % authors.length];
  }

  String _getStoryReadTime(int index) {
    final readTimes = [
      '3 min read',
      '5 min read',
      '7 min read',
      '4 min read',
      '6 min read'
    ];
    return readTimes[index % readTimes.length];
  }

  String _getStoryExcerpt(int index) {
    final excerpts = [
      'Discover the intricate art of Kente weaving and its cultural significance in Ghanaian tradition...',
      'Learn about the rhythmic patterns and spiritual meanings behind traditional African drumming...',
      'Explore the architectural marvels of ancient African civilizations and their lasting impact...',
      'Uncover the symbolic meanings behind Adinkra symbols and their role in West African culture...',
      'Journey through the rich tradition of oral storytelling that has preserved African history...',
    ];
    return excerpts[index % excerpts.length];
  }

  String _getStoryImage(int index) {
    final images = [
      'https://images.pexels.com/photos/6200343/pexels-photo-6200343.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    return images[index % images.length];
  }

  String _getStoryPublishedAt(int index) {
    final dates = [
      '2 hours ago',
      '5 hours ago',
      '1 day ago',
      '2 days ago',
      '3 days ago',
      '1 week ago'
    ];
    return dates[index % dates.length];
  }

  String _getStoryContent(int index) {
    return '''
This is the full content of the story. In a real app, this would contain the complete article text with proper formatting, images, and rich content.

The story would include detailed information about the topic, historical context, cultural significance, and personal anecdotes from community members.

This content would be much longer and more comprehensive than what's shown here as a placeholder.
    ''';
  }
}
