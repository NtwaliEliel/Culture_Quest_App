import 'package:flutter/material.dart';

class StoryPage extends StatelessWidget {
  final String title;
  final String author;
  final String content;
  final String imageUrl;

  const StoryPage({
    super.key,
    required this.title,
    required this.author,
    required this.content,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(""),
      ),
      body: Column(
      children: [
        if (imageUrl.isNotEmpty)
          ClipRRect(
            borderRadius: BorderRadius.zero,
            child: Image.network(
              imageUrl,
              width: double.infinity,
              height: 1200, // Adjust height as needed
              fit: BoxFit.cover,
            ),
          ),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                
                const SizedBox(height: 8),
                Text(
                  title,
                  style: Theme.of(context).textTheme.headlineSmall,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  'By $author',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.grey[600],
                      ),
                ),
                const SizedBox(height: 16),
                Text(
                  content,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
        ),
      ],
    ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.white,
        selectedItemColor: Colors.black,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.event),
            label: 'Events',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.book),
            label: 'Stories',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.groups),
            label: 'Artisans',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        currentIndex: 2, // Set to 2 since this is the Stories page
        onTap: (index) {
          // Handle navigation logic here
        },
  ),
    );
  }
}