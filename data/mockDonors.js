
// Mock Data Generators for FindMyBlood
(function () {
    // South Indian names for donors
    const southIndianNames = [
        "Venkatesh Reddy", "Lakshmi Devi", "Srikanth Rao", "Padmavathi K", "Ravi Teja",
        "Anitha Kumari", "Suresh Babu", "Kavitha Reddy", "Ramesh Chandra", "Sunitha Devi",
        "Nagaraju M", "Bhavani S", "Krishna Murthy", "Vijaya Lakshmi", "Srinivas Rao",
        "Aruna Kumari", "Rajesh Kumar", "Swathi Reddy", "Mahesh Babu", "Divya Sri",
        "Prasad Reddy", "Anusha K", "Vamsi Krishna", "Sirisha M", "Harish Varma",
        "Pallavi Reddy", "Anil Kumar", "Madhavi L", "Kiran Kumar", "Sravani P",
        "Chandra Sekhar", "Lavanya S", "Mohan Rao", "Sandhya K", "Pavan Kumar",
        "Swetha Reddy", "Naresh Babu", "Revathi M", "Ganesh Kumar", "Keerthana S",
        "Raju Naidu", "Vasantha K", "Satish Reddy", "Durga Devi", "Vivek Sagar",
        "Sushma Rani", "Prakash Rao", "Usha Rani", "Manoj Kumar", "Rekha Kumari",
        "Sudheer Reddy", "Jyothi K", "Bhaskar Rao", "Priya Darshini", "Ajay Kumar",
        "Nandini S", "Shiva Kumar", "Rani Devi", "Karthik Reddy", "Sahithi M",
        "Venkata Rao", "Sowmya K", "Ravi Kumar", "Tejaswini R", "Sreedhar M",
        "Latha K", "Vinod Kumar", "Sneha Reddy", "Sunil Reddy", "Pooja S",
        "Raghu Ram", "Deepika K", "Ashok Kumar", "Bhargavi R", "Praveen Kumar",
        "Shruthi M", "Naveen Reddy", "Sirisha K", "Ramakrishna M", "Archana S",
        "Suresh Reddy", "Meghana K", "Kishore Babu", "Priyanka R", "Sai Krishna",
        "Mounika S", "Jagadeesh M", "Ramya K", "Phani Kumar", "Akshitha R",
        "Satyanarayana M", "Haritha K", "Gopal Krishna", "Sindhuja R", "Aravind K",
        "Manasa S", "Siddharth R", "Anjali K", "Balaji M", "Chandana S"
    ];

    const cities = ["Hyderabad", "Vizag", "Amaravathi", "Khammam", "Vijayawada", "Kurnool", "Guntur"];
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    // Generate 20 donors for each blood group in each city
    const generateDonors = () => {
        const donors = [];
        let id = 1;
        let nameIndex = 0;

        cities.forEach((city) => {
            bloodGroups.forEach((bloodGroup) => {
                for (let i = 0; i < 20; i++) {
                    const name = southIndianNames[nameIndex % southIndianNames.length];
                    nameIndex++;

                    donors.push({
                        id: id++,
                        name,
                        bloodGroup,
                        distance: parseFloat((Math.random() * 25 + 1).toFixed(1)),
                        phone: `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                        city,
                        isAvailable: Math.random() > 0.2, // 80% available
                        donationCount: Math.floor(Math.random() * 20) + 1,
                        lastDonation: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
                    });
                }
            });
        });

        return donors;
    };

    // Expose to global scope
    window.mockDonors = generateDonors();
})();
