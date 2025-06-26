import 'package:flutter/material.dart';

class StoriesPage extends StatelessWidget {
  final List<ArtisanStory> stories = [
    ArtisanStory(
      name: 'The Golden Stool of',
      description: 'Explore the vibrant history of the Ashanti Kingdom, known.',
      podcastUrl: 'https://example.com/podcasts/kwame.mp3',
    ),
    ArtisanStory(
      name: 'Adinkra Cloth: Symbols of ',
      description: 'Discover the ancient art of Adinkra cloth printing, where .',
      podcastUrl: 'https://example.com/podcasts/amina.mp3',
    ),
    ArtisanStory(
      name: 'Kente Weaving: Threads of ',
      description: 'Unravel the intricate patterns and meanings behind Kente .',
      podcastUrl: 'https://example.com/podcasts/kwesi.mp3',
    ),
    ArtisanStory(
      name: 'The Art of Pottery in Ghana',
      description: 'Delve into the traditional pottery techniques passed down .',
      podcastUrl: 'https://example.com/podcasts/akosua.mp3',
    ),
    ArtisanStory(
      name: 'Ghanaian Drumming: Rhythms of ',
      description: 'Experience the heartbeat of Ghana through its rich drumming .',
      podcastUrl: 'https://example.com/podcasts/kwabena.mp3',
    ),
    ArtisanStory(
      name: 'Bead Making: A Legacy of ', 
      description: 'Learn about the colorful world of Ghanaian bead making, .',
      podcastUrl: 'https://example.com/podcasts/efia.mp3',
    ),
    ArtisanStory(
      name: 'Traditional Fishing Techniques',
      description: 'Explore the age-old fishing methods that sustain coastal .',
      podcastUrl: 'https://example.com/podcasts/akua.mp3',
    ),
    // Add more stories as needed
  ];
  
  StoriesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Stories',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
        ),
        centerTitle: true,
      ),
      body: ListView.builder(
        itemCount: stories.length,
        itemBuilder: (context, index) {
          final story = stories[index];
          return Card(
            color: Colors.white,
            margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: ListTile(
              leading: CircleAvatar(
                backgroundImage: AssetImage('assets/images/artisan_placeholder.png'),
              ),
              title: Text(story.name),
              subtitle: Text(story.description),
              trailing: IconButton(
                icon: Icon(Icons.headphones),
                onPressed: () {
                  // Implement podcast playback logic here
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Playing podcast: ${story.name}')),
                  );
                },
              ),
            ),
          );
        },
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
        currentIndex: 1, // Set to 1 since this is the Stories page
        onTap: (index) {
          // Handle navigation logic here
        },
  ),
    );
  }
}

class ArtisanStory {
  final String name;
  final String description;
  final String podcastUrl;

  ArtisanStory({
    required this.name,
    required this.description,
    required this.podcastUrl,
  });
}