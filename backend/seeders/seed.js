const { sequelize, User, Restaurant, Review } = require('../models');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database (force: true will drop existing tables)
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@achbanlik.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created');

    // Create regular users
    const user1 = await User.create({
      name: 'Ahmed Bennani',
      email: 'ahmed@example.com',
      password: 'password123',
      role: 'user'
    });

    const user2 = await User.create({
      name: 'Fatima Zahra',
      email: 'fatima@example.com',
      password: 'password123',
      role: 'user'
    });

    const user3 = await User.create({
      name: 'Youssef El Amrani',
      email: 'youssef@example.com',
      password: 'password123',
      role: 'user'
    });

    console.log('✅ Regular users created');

    // Create 20 restaurants
    const restaurants = [
      {
        name: 'Le Comptoir Darna',
        shortDescription: 'Restaurant marocain traditionnel avec spectacle de danse',
        longDescription: 'Un magnifique restaurant situé au cœur de Marrakech, offrant une cuisine marocaine authentique dans une ambiance festive avec des spectacles de danse orientale tous les soirs.',
        address: 'Avenue Echouhada, Hivernage',
        city: 'Marrakech',
        latitude: 31.6295,
        longitude: -8.0089,
        mainImage: '/uploads/restaurants/placeholder-1.jpg'
      },
      {
        name: 'Rick\'s Café',
        shortDescription: 'Restaurant inspiré du film Casablanca',
        longDescription: 'Un restaurant emblématique de Casablanca inspiré du célèbre film. Ambiance années 1940, cuisine internationale et marocaine raffinée.',
        address: '248 Boulevard Sour Jdid',
        city: 'Casablanca',
        latitude: 33.5964,
        longitude: -7.6164,
        mainImage: '/uploads/restaurants/placeholder-2.jpg'
      },
      {
        name: 'La Maison Arabe',
        shortDescription: 'Restaurant gastronomique marocain de luxe',
        longDescription: 'L\'un des restaurants les plus prestigieux de Marrakech offrant une expérience culinaire exceptionnelle avec des plats marocains raffinés.',
        address: '1 Derb Assehbe, Bab Doukkala',
        city: 'Marrakech',
        latitude: 31.6369,
        longitude: -8.0195,
        mainImage: '/uploads/restaurants/placeholder-3.jpg'
      },
      {
        name: 'Nomad',
        shortDescription: 'Cuisine moderne dans un cadre contemporain',
        longDescription: 'Restaurant moderne au cœur de la médina de Marrakech, proposant une fusion créative de la cuisine marocaine et internationale.',
        address: '1 Derb Aarjane, Rahba Lakdima',
        city: 'Marrakech',
        latitude: 31.6250,
        longitude: -7.9898,
        mainImage: '/uploads/restaurants/placeholder-4.jpg'
      },
      {
        name: 'Dar Moha',
        shortDescription: 'Cuisine marocaine raffinée dans un riad',
        longDescription: 'Un riad transformé en restaurant gastronomique offrant une cuisine marocaine revisitée par le chef Moha Fedal.',
        address: '81 Rue Dar El Bacha',
        city: 'Marrakech',
        latitude: 31.6321,
        longitude: -7.9944,
        mainImage: '/uploads/restaurants/placeholder-5.jpg'
      },
      {
        name: 'La Sqala',
        shortDescription: 'Restaurant dans une ancienne forteresse',
        longDescription: 'Situé dans une forteresse du 18ème siècle, ce restaurant offre une cuisine marocaine authentique dans un cadre historique unique.',
        address: 'Boulevard des Almohades',
        city: 'Casablanca',
        latitude: 33.5892,
        longitude: -7.6282,
        mainImage: '/uploads/restaurants/placeholder-6.jpg'
      },
      {
        name: 'Le Foundouk',
        shortDescription: 'Restaurant fusion dans un ancien caravansérail',
        longDescription: 'Un ancien caravansérail restauré proposant une cuisine fusion marocaine-française dans un décor élégant.',
        address: '55 Souk Hal Fassi, Kat Ben Nahid',
        city: 'Marrakech',
        latitude: 31.6306,
        longitude: -7.9897,
        mainImage: '/uploads/restaurants/placeholder-7.jpg'
      },
      {
        name: 'Al Fassia',
        shortDescription: 'Cuisine marocaine traditionnelle tenue par des femmes',
        longDescription: 'Restaurant familial entièrement géré par des femmes, offrant une cuisine marocaine authentique et généreuse.',
        address: '55 Boulevard Zerktouni, Guéliz',
        city: 'Marrakech',
        latitude: 31.6314,
        longitude: -8.0089,
        mainImage: '/uploads/restaurants/placeholder-8.jpg'
      },
      {
        name: 'Café Clock',
        shortDescription: 'Café culturel avec cuisine fusion',
        longDescription: 'Un espace culturel unique offrant une cuisine fusion créative et organisant régulièrement des événements culturels.',
        address: '7 Derb El Magana, Talaa Kbira',
        city: 'Fès',
        latitude: 34.0630,
        longitude: -4.9766,
        mainImage: '/uploads/restaurants/placeholder-9.jpg'
      },
      {
        name: 'Nur Restaurant',
        shortDescription: 'Gastronomie marocaine moderne',
        longDescription: 'Restaurant étoilé Michelin proposant une cuisine marocaine contemporaine avec des influences méditerranéennes.',
        address: '23 Derb Chtouka, Kasbah',
        city: 'Fès',
        latitude: 34.0611,
        longitude: -4.9778,
        mainImage: '/uploads/restaurants/placeholder-10.jpg'
      },
      {
        name: 'Le Jardin',
        shortDescription: 'Restaurant avec jardin luxuriant',
        longDescription: 'Un havre de paix au cœur de la médina, avec un magnifique jardin et une cuisine marocaine légère et savoureuse.',
        address: '32 Souk Jeld, Sidi Abdelaziz',
        city: 'Marrakech',
        latitude: 31.6283,
        longitude: -7.9892,
        mainImage: '/uploads/restaurants/placeholder-11.jpg'
      },
      {
        name: 'La Famille',
        shortDescription: 'Cuisine végétarienne dans un jardin secret',
        longDescription: 'Restaurant végétarien niché dans un jardin caché de la médina, proposant des plats frais et créatifs.',
        address: '42 Rue Riad Zitoun Jdid',
        city: 'Marrakech',
        latitude: 31.6226,
        longitude: -7.9889,
        mainImage: '/uploads/restaurants/placeholder-12.jpg'
      },
      {
        name: 'Boccalino',
        shortDescription: 'Restaurant italien authentique',
        longDescription: 'Le meilleur restaurant italien de Casablanca, proposant des pâtes fraîches et des pizzas au feu de bois.',
        address: '107 Rue du Prince Moulay Abdellah',
        city: 'Casablanca',
        latitude: 33.5931,
        longitude: -7.6194,
        mainImage: '/uploads/restaurants/placeholder-13.jpg'
      },
      {
        name: 'Pepe Nero',
        shortDescription: 'Cuisine italienne raffinée',
        longDescription: 'Restaurant italien élégant offrant une cuisine méditerranéenne raffinée dans un cadre contemporain.',
        address: '17 Rue Loubnane, Maarif',
        city: 'Casablanca',
        latitude: 33.5731,
        longitude: -7.6298,
        mainImage: '/uploads/restaurants/placeholder-14.jpg'
      },
      {
        name: 'La Bodega',
        shortDescription: 'Tapas espagnoles et ambiance festive',
        longDescription: 'Un restaurant espagnol animé proposant des tapas authentiques et une large sélection de vins dans une ambiance conviviale.',
        address: '129-131 Rue Allal Ben Abdellah',
        city: 'Casablanca',
        latitude: 33.5918,
        longitude: -7.6242,
        mainImage: '/uploads/restaurants/placeholder-15.jpg'
      },
      {
        name: 'Bagatelle',
        shortDescription: 'Cuisine française contemporaine',
        longDescription: 'Restaurant français chic offrant une cuisine gastronomique dans un décor élégant et moderne.',
        address: '1 Rue Achtouki, Hivernage',
        city: 'Marrakech',
        latitude: 31.6289,
        longitude: -8.0125,
        mainImage: '/uploads/restaurants/placeholder-16.jpg'
      },
      {
        name: 'Dar Zellij',
        shortDescription: 'Palais du 17ème siècle transformé en restaurant',
        longDescription: 'Un magnifique palais restauré offrant une cuisine marocaine traditionnelle dans un décor somptueux avec fontaines et zellige.',
        address: 'Kaâ Sour, Sidi Ben Slimane',
        city: 'Marrakech',
        latitude: 31.6294,
        longitude: -7.9856,
        mainImage: '/uploads/restaurants/placeholder-17.jpg'
      },
      {
        name: 'Kosybar',
        shortDescription: 'Bar-restaurant avec vue panoramique',
        longDescription: 'Perché au-dessus de la médina, ce restaurant offre une vue imprenable et une cuisine fusion internationale.',
        address: '47 Place des Ferblantiers',
        city: 'Marrakech',
        latitude: 31.6217,
        longitude: -7.9881,
        mainImage: '/uploads/restaurants/placeholder-18.jpg'
      },
      {
        name: 'Le Tobsil',
        shortDescription: 'Expérience culinaire marocaine raffinée',
        longDescription: 'Restaurant intimiste proposant un menu fixe exceptionnel de cuisine marocaine traditionnelle dans un riad authentique.',
        address: '22 Derb Abdellah Ben Hessaien, Bab Ksour',
        city: 'Marrakech',
        latitude: 31.6301,
        longitude: -7.9923,
        mainImage: '/uploads/restaurants/placeholder-19.jpg'
      },
      {
        name: 'Seasons Restaurant',
        shortDescription: 'Cuisine méditerranéenne de saison',
        longDescription: 'Restaurant gastronomique utilisant des produits locaux de saison pour créer une cuisine méditerranéenne créative.',
        address: 'Four Seasons Resort, Route de Ouarzazate',
        city: 'Marrakech',
        latitude: 31.6054,
        longitude: -8.0451,
        mainImage: '/uploads/restaurants/placeholder-20.jpg'
      }
    ];

    const createdRestaurants = await Restaurant.bulkCreate(restaurants);
    console.log('✅ 20 restaurants created');

    // Create some sample reviews
    const reviews = [
      {
        userId: user1.id,
        restaurantId: createdRestaurants[0].id,
        rating: 5,
        comment: 'Expérience exceptionnelle! La nourriture était délicieuse et le spectacle de danse magnifique.',
        visitDate: '2024-01-15'
      },
      {
        userId: user2.id,
        restaurantId: createdRestaurants[0].id,
        rating: 4,
        comment: 'Très bon restaurant, ambiance festive. Un peu bruyant mais ça fait partie du charme.',
        visitDate: '2024-02-20'
      },
      {
        userId: user1.id,
        restaurantId: createdRestaurants[1].id,
        rating: 5,
        comment: 'Incroyable! On se croirait vraiment dans le film. Le piano bar est superbe.',
        visitDate: '2024-03-10'
      },
      {
        userId: user3.id,
        restaurantId: createdRestaurants[1].id,
        rating: 4,
        comment: 'Belle ambiance et bonne cuisine. Service impeccable.',
        visitDate: '2024-03-15'
      },
      {
        userId: user2.id,
        restaurantId: createdRestaurants[2].id,
        rating: 5,
        comment: 'Le meilleur restaurant marocain que j\'ai essayé. Tout était parfait!',
        visitDate: '2024-02-28'
      },
      {
        userId: user3.id,
        restaurantId: createdRestaurants[3].id,
        rating: 5,
        comment: 'Cadre moderne et cuisine créative. La terrasse sur le toit est magnifique!',
        visitDate: '2024-01-20'
      },
      {
        userId: user1.id,
        restaurantId: createdRestaurants[4].id,
        rating: 4,
        comment: 'Excellent riad et cuisine délicieuse. Prix élevés mais justifiés.',
        visitDate: '2024-02-14'
      },
      {
        userId: user2.id,
        restaurantId: createdRestaurants[5].id,
        rating: 4,
        comment: 'Cadre historique unique et plats savoureux. Très bon rapport qualité-prix.',
        visitDate: '2024-03-01'
      }
    ];

    await Review.bulkCreate(reviews);
    console.log('✅ Sample reviews created');

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📧 Admin credentials:');
    console.log('   Email: admin@achbanlik.com');
    console.log('   Password: admin123\n');
    console.log('📧 User credentials:');
    console.log('   Email: ahmed@example.com');
    console.log('   Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
