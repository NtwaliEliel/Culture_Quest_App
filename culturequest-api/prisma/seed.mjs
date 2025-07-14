import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@culturequest.com',
      password: adminPassword,
      role: 'admin',
      languages: ['English', 'Kinyarwanda'],
      city: 'Kigali',
      country: 'Rwanda',
      coordinates: { latitude: -1.9441, longitude: 30.0619 },
      timezone: 'Africa/Kigali',
    },
  });

  // Create sample artisan
  const artisan = await prisma.artisan.create({
    data: {
      name: 'Mutoni Grace',
      profession: 'Traditional Weaver',
      description: 'Master weaver with 20 years of experience in traditional Rwandan basket weaving.',
      city: 'Kigali',
      coordinates: { latitude: -1.9441, longitude: 30.0619 },
      workingHours: {
        monday: '9:00-17:00',
        tuesday: '9:00-17:00',
        wednesday: '9:00-17:00',
        thursday: '9:00-17:00',
        friday: '9:00-17:00',
      },
      specialties: ['Agaseke', 'Peace Baskets', 'Traditional Weaving'],
      gallery: [
        {
          url: 'default-artisan-image-1.jpg',
          caption: 'Working on an Agaseke basket',
        }
      ],
      phone: '+250700000000',
      email: 'mutoni@example.com',
      whatsapp: '+250700000000',
      preferredContact: 'whatsapp',
      isVerified: true,
      verifiedById: admin.id,
      verificationDate: new Date(),
      documents: ['business-license.pdf', 'certification.pdf'],
      crafts: [
        {
          name: 'Agaseke Basket',
          description: 'Traditional Rwandan peace basket',
          price: 50.00,
          materials: ['Sisal', 'Natural dyes'],
          timeToMake: '3 days',
        }
      ],
    },
  });

  // Create sample story
  const story = await prisma.story.create({
    data: {
      title: 'The Origin of Agaseke',
      type: 'text',
      text: 'The Agaseke basket has been a symbol of peace and reconciliation in Rwanda for generations...',
      language: 'English',
      region: 'Kigali',
      culturalContext: 'Symbol of peace and unity in Rwandan culture',
      verificationStatus: 'verified',
      verifiedById: admin.id,
      verificationDate: new Date(),
      tags: ['crafts', 'peace', 'tradition'],
      narratorId: admin.id,
    },
  });

  // Create sample event
  const event = await prisma.event.create({
    data: {
      title: 'Traditional Weaving Workshop',
      description: 'Learn the art of traditional basket weaving from master artisans.',
      venue: 'Kigali Cultural Center',
      address: '123 Culture Street, Kigali',
      coordinates: { latitude: -1.9441, longitude: 30.0619 },
      startDate: new Date('2024-08-01T09:00:00Z'),
      endDate: new Date('2024-08-01T17:00:00Z'),
      timezone: 'Africa/Kigali',
      category: 'Workshop',
      culturalSignificance: 'Preserving traditional craft techniques',
      capacity: 20,
      images: ['workshop-banner.jpg'],
      videos: [],
      sessions: [
        {
          name: 'Morning Session',
          startTime: '09:00',
          endTime: '12:00',
          description: 'Introduction to basic weaving techniques',
        },
        {
          name: 'Afternoon Session',
          startTime: '13:00',
          endTime: '17:00',
          description: 'Advanced patterns and finishing techniques',
        },
      ],
      artisans: {
        connect: {
          id: artisan.id,
        },
      },
    },
  });

  console.log('Seed data created successfully:', {
    admin: { id: admin.id, email: admin.email },
    artisan: { id: artisan.id, name: artisan.name },
    story: { id: story.id, title: story.title },
    event: { id: event.id, title: event.title },
  });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 