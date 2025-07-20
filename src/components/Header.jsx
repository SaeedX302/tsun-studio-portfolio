// src/components/Header.jsx

import React from 'react';
import { Wrench, UserCog } from 'lucide-react';

/*
 * =================================================================
 * STYLING OPTIONS
 * =================================================================
 * 1. Tailwind CSS (Default): Classes are already in the JSX.
 *
 * 2. SASS/SCSS:
 * - Create 'Header.scss'.
 * - Import it: import './Header.scss';
 * - Remove Tailwind classes and use BEM, e.g., <header className="header">.
 *
 * 3. Styled-Components:
 * - import styled from 'styled-components';
 * - Create styled wrappers, e.g.:
 * const HeaderWrapper = styled.header`...`;
 * - Use them: <HeaderWrapper>...</HeaderWrapper>.
 *
 * 4. CSS Modules:
 * - Create 'Header.module.css'.
 * - Import it: import styles from './Header.module.css';
 * - Use it: <header className={styles.header}>.
 * =================================================================
 */

const Header = ({ onChangelogOpen, onAdminOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-lg z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white tracking-wider">
          TSun <span className="text-cyan-400">StudioPortfolio</span>
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={onChangelogOpen}
            className="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            <Wrench className="w-4 h-4" />
            <span>Changelog</span>
          </button>
          <button
            onClick={onAdminOpen}
            className="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
          >
            <UserCog className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
