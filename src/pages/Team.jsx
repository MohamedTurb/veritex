import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const localTeamImages = import.meta.glob('../assets/team/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
});

const getLocalImage = (fileName) => localTeamImages[`../assets/team/${fileName}`];

const team = [
  {
    name: 'Mohamed Khaled',
    role: '192300448',
    imageFile: 'Mohamed.jpg',
    fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
  },
  {
    name: 'Mohamed alaa Eldin',
    role: '192300519',
    imageFile: 'mohamed alla.jpeg',
    fallback: 'https://images.unsplash.com/photo-1494790108755-2616b612a4ba?w=300&q=80',
  },
  {
    name: 'Abdelaziz Amir Abdelaziz',
    role: '192300477',
    imageFile: 'zizo.jpeg',
    fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
  },
  {
    name: 'Mohamed Amr',
    role: '192300311',
    imageFile: 'mohamed alla.jpeg',
    fallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
  },
  {
    name: 'Mohamed Hatem Mohamed',
    role: '192300191',
    imageFile: 'jordan-lee.jpg',
    fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',
  },
  {
    name: 'Waleed Khalaf',
    role: '192200272',
    imageFile: 'nina-torres.jpg',
    fallback: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
  },
   {
    name: 'Abdallah Mousa',
    role: '192300370',
    imageFile: 'mousa.jpeg',
    fallback: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
  },
];

const teamWithImage = team.map((member) => ({
  ...member,
  img: getLocalImage(member.imageFile) || member.fallback,
}));

export default function Team() {
  return (
    <PageTransition>
      <section className="bg-gradient-to-br from-gray-900 to-dark-800 text-white py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-brand-500/20 text-brand-400 mb-4">Meet the Team</span>
            <h1 className="text-5xl md:text-6xl font-bold">The People<br /><span className="text-gradient">Behind Veritex</span></h1>
            <p className="mt-6 text-gray-400 text-lg">A passionate team of builders, designers, and operators working to reimagine commerce.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamWithImage.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="card p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-brand-100 dark:ring-brand-500/20">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{member.name}</h3>
              <span className="text-sm font-medium text-brand-500">{member.role}</span>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-dark-800 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title mb-4">Join Our Team</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">We're always looking for talented people to help us build the future of shopping.</p>
          <a href="#" className="btn-primary inline-block py-3 px-8">View Open Positions</a>
        </div>
      </section>
    </PageTransition>
  );
}
