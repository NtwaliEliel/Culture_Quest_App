import 'package:flutter/material.dart';

class ArtisanProfilePage extends StatelessWidget {
  final String name;
  final String profileImageUrl;
  final String bio;
  final List<String> skills;
  final List<String> galleryImages;

  const ArtisanProfilePage({
    Key? key,
    this.name = "Jane Doe",
    this.profileImageUrl = "https://via.placeholder.com/150",
    this.bio = "Experienced artisan specializing in traditional crafts.",
    this.skills = const ["Pottery", "Weaving", "Woodwork"],
    this.galleryImages = const [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/301",
      "https://via.placeholder.com/302"
    ],
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(name),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CircleAvatar(
                radius: 60,
                backgroundImage: NetworkImage(profileImageUrl),
              ),
            ),
            const SizedBox(height: 16),
            Center(
              child: Text(
                name,
                style: Theme.of(context).textTheme.headline6,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              bio,
              style: Theme.of(context).textTheme.bodyText2,
            ),
            const SizedBox(height: 16),
            Text(
              "Skills",
              style: Theme.of(context).textTheme.subtitle1,
            ),
            Wrap(
              spacing: 8,
              children: skills
                  .map((skill) => Chip(label: Text(skill)))
                  .toList(),
            ),
            const SizedBox(height: 24),
            Text(
              "Gallery",
              style: Theme.of(context).textTheme.subtitle1,
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 120,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: galleryImages.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  return ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.network(
                      galleryImages[index],
                      width: 120,
                      height: 120,
                      fit: BoxFit.cover,
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}