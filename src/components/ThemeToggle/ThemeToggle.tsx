import React from 'react';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import useAuthStore from '@Store/authStore';

const ThemeToggle: React.FC = () => {
    const { isDark, toggleTheme } = useAuthStore();

    return (
        <button
            onClick={toggleTheme}
            className="fixed right-6 top-26 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <SunOutlined className="text-yellow-500 text-xl" />
            ) : (
                <MoonOutlined className="text-gray-700 text-xl" />
            )}
        </button>
    );
};

export default ThemeToggle; 