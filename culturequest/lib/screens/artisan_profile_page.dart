import 'package:flutter/material.dart';

class ArtisanProfilePage extends StatelessWidget {
  final String name;
  final String profileImageUrl;
  final String title;
  final String location;
  final String bio;
  final List<String> specialities;
  final List<String> galleryImages;

  const ArtisanProfilePage({
    super.key,
    this.name = "Omar Marmoush",
    this.profileImageUrl = "Assets/Profile-Picture.png",
    this.title = "Traditional Weaver",
    this.location = "Marrakesh, Morocco",
    this.bio = "Omar Marmoush is a master weaver from Marrakesh, Morocco, known for his intricate designs and use of natural dyes. His work reflects the rich cultural heritage of the Moroccan people, blending traditional techniques with contemporary aesthetics.",
    this.specialities = const ["Textile Art", "Natural Dyes", "Yoruba Weaving"],
    this.galleryImages = const [
      "Assets/Gallery_1.png",
      "Assets/Gallery_2.png",
      "Assets/Gallery_3.png"
    ],
  });

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
          "Artisan Profile",
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CircleAvatar(
                radius: 60,
                backgroundImage: AssetImage(profileImageUrl),
              ),
            ),
            const SizedBox(height: 16),
            
            Center(
              child: Text(
                name,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 8),
            Center(
              child: Text(
                title,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey[600],
                    ),
              ),
            ),
            const SizedBox(height: 8),
            Center(
              child: Text(
                location,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey[600],
                    ),
              ),
            ),
            const SizedBox(height: 16),

            Center(
              child: Text(
                bio,
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 16),

            Center(
              child: Text(
                "Gallery",
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
            const SizedBox(height: 8),
            Center(
              child: SizedBox(
                height: 120,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: galleryImages.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 8),
                  itemBuilder: (context, index) {
                    return ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.asset(
                        galleryImages[index],
                        width: 120,
                        height: 120,
                        fit: BoxFit.cover,
                      ),
                    );
                  },
                ),
              ),
            ),
            const SizedBox(height: 16),
            Center(
              child: Text(
              "Specialities",
              style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
            const SizedBox(height: 8),
            Center(
              child: Wrap(
                spacing: 5,
                children: specialities
                    .map((skill) => Chip(
                          label: Text(
                            skill,
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                  color: Colors.black,
                                ),
                          ),
                          backgroundColor: Colors.grey[200],
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ))
                    .toList(),
              ),
            ),
            const SizedBox(height: 24),
            Center(
              child: ElevatedButton(
                onPressed: () {
                  // Action when the button is pressed
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 120, vertical: 20),
                  textStyle: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.black,
                      ),
                  backgroundColor: Color.fromRGBO(242, 122, 33, 1),

                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                ),
                child: const Text(
                  "Contact Artisan",
                  style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}