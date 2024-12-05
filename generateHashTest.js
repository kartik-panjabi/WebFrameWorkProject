const bcrypt = require('bcryptjs');

const generateHash = async () => {
    const plainPassword = "Humber"; // Replace with your desired password
    const saltRounds = 10; // Number of salt rounds for hashing

    try {
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        console.log("Generated hash for password:", hash);
    } catch (error) {
        console.error("Error generating hash:", error);
    }
};

generateHash();
