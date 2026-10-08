$names = @("Rahul Sharma", "Pooja Verma", "Amit Singh", "Sneha Gupta", "Vikram Rathore", "Neha Kapoor", "Sanjay Das", "Ritu Desai", "Karan Malhotra", "Anjali Nair", "Sunil Yadav", "Meera Joshi", "Deepak Chawla", "Kavita Reddy", "Ramesh Babu", "Swati Mishra", "Ashish Jain", "Divya Thakur", "Naveen Hooda", "Priyanka Saxena", "Manish Tiwari", "Ankita Bhatia", "Rohan Mehta", "Simran Kaur", "Tarun Bajaj")
$locations = @("Sector-27, Rohtak", "Suncity, Rohtak", "HSVP Sector-2, Rohtak", "HSVP Sector-3, Rohtak", "Rohtak City", "Sector-1, Rohtak", "Sector-25, Rohtak", "Suncity Sector-36")
$feedbacks = @(
    "Purchased a beautiful luxury villa through Arjun Buildtech. The process was incredibly smooth and they handled all paperwork flawlessly.",
    "Highly professional team. They helped us invest in a premium villa in Suncity that we absolutely love.",
    "Best real estate consultants in Rohtak! Found the perfect property for my family's future.",
    "Their knowledge of HSVP plots is unmatched. Very happy with my investment and the ROI so far.",
    "Invested in a commercial property on their recommendation. Seeing great returns already.",
    "Excellent service. They made purchasing our new villa a breeze. Highly recommended for premium properties.",
    "Very transparent dealing. Got a fantastic deal on a residential plot. No hidden fees or surprises.",
    "If you want to buy a villa in Rohtak, these are the guys to go to. Top-notch inventory.",
    "Highly recommend their services for property investment. Very trustworthy and patient consultants.",
    "Great experience overall. The team was supportive from start to finish and answered all my questions.",
    "Arjun Buildtech provides genuine deals. Invested in a plot in Sector 27 and the value has already gone up.",
    "Bought our dream home with their help. Truly grateful for their dedication and local market knowledge.",
    "Professional, reliable, and honest. 5 stars for their property consulting. They really understand Rohtak real estate.",
    "They have the best listings for villas and premium plots in Rohtak. The agents are very polite.",
    "Seamless investment experience. The paperwork was handled flawlessly and the transition was quick.",
    "I was looking for a high-return investment and Arjun Buildtech delivered exactly what I needed.",
    "The best agency for buying a villa. We felt completely supported throughout the entire transaction.",
    "Extremely satisfied with the commercial space we purchased. Perfect location for our new business.",
    "Their team goes above and beyond. We bought a 4 BHK villa and the process was stress-free.",
    "I've worked with many brokers, but Arjun Buildtech is by far the most professional and transparent in Haryana."
)

Write-Host "Starting to add 50 reviews..."

for ($i = 0; $i -lt 50; $i++) {
    $name = $names[(Get-Random -Maximum $names.Length)]
    $location = $locations[(Get-Random -Maximum $locations.Length)]
    $feedback = $feedbacks[(Get-Random -Maximum $feedbacks.Length)]
    
    $rating = 5
    if ((Get-Random -Maximum 10) -gt 8) { $rating = 4 }
    
    $dateObj = (Get-Date).AddDays(-(Get-Random -Maximum 365))
    $date = $dateObj.ToString("yyyy-MM-dd")
    
    $review = @{
        fields = @{
            name = @{ stringValue = $name }
            feedback = @{ stringValue = $feedback }
            rating = @{ integerValue = $rating }
            location = @{ stringValue = $location }
            date = @{ stringValue = $date }
        }
    }
    
    $json = $review | ConvertTo-Json -Depth 5
    Invoke-RestMethod -Uri "https://firestore.googleapis.com/v1/projects/arjunbuildtech-8b826/databases/(default)/documents/reviews" -Method Post -Body $json -ContentType "application/json"
    
    Write-Host "Added review $($i + 1)/50"
}

Write-Host "Finished adding 50 reviews!"
