import Link from 'next/link';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <>
      <div className='sm:h-[300px] md:h-[300px] bg-red-900 flex justify-center items-center text-yellow-100 mt-10'>
        <div className="w-[90%] h-full grid grid-cols-4 justify-center items-center gap-4">
          {/* Inkspire Info */}
          <div className="w-[80%]">
            <h1 className="text-[30px] font-bold">Inkspire</h1>
            <p className="text-[13px] text-yellow-100 opacity-70">
              Inkspire is a platform for book lovers to rent and lend their favorite books. Join us and explore new reads!
            </p>
            <div className="flex gap-2 mt-5">
              {/* Social media icons */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="hover:text-yellow-400" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="hover:text-yellow-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="hover:text-yellow-400" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="hover:text-yellow-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h1 className="text-[24px]">Quick Links</h1>
            <Link href="/library" className='text-yellow-100 opacity-70 hover:underline'>Rent a Book</Link>
            <br />
            <Link href="/library/addbook" className='text-yellow-100 opacity-70 hover:underline mt-4'>Lend a Book</Link>
          </div>

          {/* Contact Info */}
          <div>
            <h1 className="text-[24px]">Contact Us</h1>
            <p className="text-yellow-100 opacity-70">Mobile: +91 9876543210</p>
            <p className="text-yellow-100 opacity-70">Email: contact@inkspire.com</p>
          </div>

          {/* Location */}
          <div>
            <h1 className="text-[24px]">Location</h1>
            <p className="text-yellow-100 opacity-70">123 Inkspire Avenue, Book City</p>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-yellow-100 bg-red-950 py-4">
        © 2024 Inkspire. All Rights Reserved.
      </div>
    </>
  );
}

export default Footer;
