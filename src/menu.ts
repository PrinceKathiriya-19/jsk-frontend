export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { title: 'Home & Product Finder', path: '/' },
  { title: 'Fine Chemicals', path: '/fine-chemicals-products' },
  { title: 'Speciality Intermediates', path: '/speciality-chemicals-products' },
  { title: 'Pharma Impurities', path: '/impurity-products' },
  { title: 'Custom Synthesis', path: '/custom-synthesis' },
  { title: 'Facilities & Infrastructure', path: '/facilities' },
  { title: 'Specs & Certificates', path: '/downloads' },
  { title: 'Submit Inquiry (RFQ)', path: '/order-inquiry' },
  { title: 'Customer Portal', path: '/portal' },
  { title: 'About JSK Chemicals', path: '/about-us' },
  { title: 'Contact Us', path: '/contact-us' }
];
