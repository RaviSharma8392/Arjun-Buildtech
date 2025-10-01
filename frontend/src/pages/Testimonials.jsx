import ReviewCard from "../components/common/card/ReviewCard";
import Button from "../components/common/button/Button";
import reviews from "../data/reviews.json";

const Testimonials = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-[Pacifico] text-gray-900 mb-4">
          Customer Reviews
        </h2>
        <p className="text-gray-600">Based on Google Reviews</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {reviews.slice(0, 3).map((review, index) => (
          <ReviewCard key={review.id || index} testimonial={review} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Button label="View All Reviews" to="/testimonials" variant="black" />
      </div>
    </section>
  );
};

export default Testimonials;
