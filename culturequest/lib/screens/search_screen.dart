import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../constants/app_text_styles.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  String _selectedFilter = 'All';
  final List<String> _filters = [
    'All',
    'Events',
    'Artists',
    'Stories',
    'Culture'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TextField(
          controller: _searchController,
          decoration: const InputDecoration(
            hintText: 'Search for events, artists, stories...',
            border: InputBorder.none,
            hintStyle: TextStyle(color: AppColors.textSecondary),
          ),
          onChanged: (value) {
            setState(() {
              _searchQuery = value;
            });
          },
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.clear),
            onPressed: () {
              _searchController.clear();
              setState(() {
                _searchQuery = '';
              });
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Filter chips
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

          // Search results
          Expanded(
            child: _searchQuery.isEmpty
                ? _buildRecentSearches()
                : _buildSearchResults(),
          ),
        ],
      ),
    );
  }

  Widget _buildRecentSearches() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Recent Searches',
            style: AppTextStyles.heading1.copyWith(fontSize: 20),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              'African Art',
              'Traditional Music',
              'Kente Weaving',
              'Cultural Events',
              'Lagos Artists',
            ]
                .map((search) => Chip(
                      label: Text(search),
                      onDeleted: () {},
                      deleteIcon: const Icon(Icons.close, size: 16),
                    ))
                .toList(),
          ),
          const SizedBox(height: 32),
          Text(
            'Popular Searches',
            style: AppTextStyles.heading1.copyWith(fontSize: 20),
          ),
          const SizedBox(height: 16),
          ListView(
            shrinkWrap: true,
            children: [
              'African Festivals',
              'Traditional Crafts',
              'Cultural Heritage',
              'Music Concerts',
              'Art Exhibitions',
            ]
                .map((search) => ListTile(
                      leading: const Icon(Icons.trending_up),
                      title: Text(search),
                      onTap: () {
                        _searchController.text = search;
                        setState(() {
                          _searchQuery = search;
                        });
                      },
                    ))
                .toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchResults() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: 10,
      itemBuilder: (context, index) {
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: AppColors.primary.withOpacity(0.1),
              ),
              child: Icon(
                _getResultIcon(index),
                color: AppColors.primary,
              ),
            ),
            title: Text(_getResultTitle(index)),
            subtitle: Text(_getResultSubtitle(index)),
            onTap: () {},
          ),
        );
      },
    );
  }

  IconData _getResultIcon(int index) {
    final icons = [
      Icons.event,
      Icons.person,
      Icons.book,
      Icons.palette,
      Icons.music_note,
    ];
    return icons[index % icons.length];
  }

  String _getResultTitle(int index) {
    final titles = [
      'African Art Festival',
      'Kwame Asante - Traditional Painter',
      'The Art of Kente Weaving',
      'Traditional Crafts Workshop',
      'Drumming Circle Event',
    ];
    return titles[index % titles.length];
  }

  String _getResultSubtitle(int index) {
    final subtitles = [
      'Event • Dec 15, 2024',
      'Artist • Lagos, Nigeria',
      'Story • 5 min read',
      'Workshop • Dec 20, 2024',
      'Event • Dec 22, 2024',
    ];
    return subtitles[index % subtitles.length];
  }
}
