import consultantOffice from '@/assets/images/consultant-office.jpg';
import familyReunion from '@/assets/images/family-reunion.jpg';
import friendsCoffee from '@/assets/images/friends-coffee.jpg';
import heroTraveler from '@/assets/images/hero-traveler.jpg';
import residenceCouple from '@/assets/images/residence-couple.jpg';
import studentCampus from '@/assets/images/student-campus.jpg';
import tcfExam from '@/assets/images/tcf-exam.jpg';
import workProfessional from '@/assets/images/work-professional.jpg';
import type { ImageMetadata } from 'astro';

export const images: Record<string, ImageMetadata> = {
  'consultant-office': consultantOffice,
  'family-reunion': familyReunion,
  'friends-coffee': friendsCoffee,
  'hero-traveler': heroTraveler,
  'residence-couple': residenceCouple,
  'student-campus': studentCampus,
  'tcf-exam': tcfExam,
  'work-professional': workProfessional,
};

export const photoCredits = [
  { subject: 'Examen de français', author: 'Andy Barbour', url: 'https://www.pexels.com/photo/6683886/' },
  { subject: 'Conseillère et client', author: 'Pavel Danilyuk', url: 'https://www.pexels.com/photo/8111887/' },
  { subject: 'Étudiants sur un campus', author: 'Keira Burton', url: 'https://www.pexels.com/photo/6146935/' },
  { subject: 'Ingénieure au travail', author: 'RDNE Stock project', url: 'https://www.pexels.com/photo/5915226/' },
  { subject: 'Couple et clés de maison', author: 'Kindel Media', url: 'https://www.pexels.com/photo/7579200/' },
  { subject: 'Amies en promenade', author: 'Vitaly Gariev', url: 'https://www.pexels.com/photo/36765205/' },
];
