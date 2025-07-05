import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import './Hero.css';

const Hero = () => {
  // Floating emojis effect
  

  // Particles initialization
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <section className="hero">
      {/* Particles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 80 },
            color: { value: ["#a855f7", "#ec4899", "#fcd34d"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#c084fc",
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out"
            }
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" }
            }
          }
        }}
      />

      {/* Main content */}
      <motion.div 
        className="hero-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title with sparkle */}
        <motion.h1
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          Young Forever
          <motion.span
            className="sparkle"
            animate={{ rotate: [0, 360] }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ✨
          </motion.span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
      
        </motion.p>

        {/* Friends avatars */}
        <div className="friends-container">
          <motion.div
            className="friend you"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            
            <p>You💖 </p>
          </motion.div>

          <motion.div 
            className="hearts"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
          >
            
          </motion.div>

          <motion.div
            className="friend them"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
           
            
          </motion.div>
        </div>

        {/* CTA button */}
       
      
      </motion.div>
    </section>
  );
};

export default Hero;