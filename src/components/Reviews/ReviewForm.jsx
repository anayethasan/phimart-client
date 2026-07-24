import { useForm } from "react-hook-form";
import StarRating from "./StarRating";


const ReviewForm = ({ onSubmit }) => {
  
    const { register, setValue, handleSubmit, watch, reset, formState: { errors, isSubmitting }, } = useForm({
        defaultValues: { ratings: 0, comment: "" },
    });
    // eslint-disable-next-line react-hooks/incompatible-library
    const ratingValue = watch("ratings", 0);
 
    const submitHandler = async (data) => {
        try {
            await onSubmit(data);
            reset({ ratings: 0, comment: "" });
        } catch (error) {
            console.log("Review submission failed", error);
        }
    };
 
    return (
      <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label className="label font-medium">
            <span className="label-text">Rating</span>
          </label>
          <StarRating
            onChange={(value) => setValue("ratings", value, { shouldValidate: true })}
            rating={ratingValue}
          />
          {errors.ratings && (
            <p className="text-error text-sm mt-1">Rating is required</p>
          )}
          <input type="hidden" {...register("ratings", { required: true, min: 1 })} />
        </div>
 
        <div className="form-control">
          <label className="label font-medium">
            <span className="label-text">Your Review</span>
          </label>
          <div>
            <textarea
              {...register("comment", { required: true })}
              className="textarea textarea-bordered min-h-30 focus:textarea-primary"
              placeholder="Share your experience with this product..."
            />
          </div>
          {errors.comment && (
            <p className="text-error text-sm mt-1">Comment is required</p>
          )}
        </div>
 
        <button
          type="submit"
          className="btn btn-primary w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-xs mr-2"></span>
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    );
};
 
export default ReviewForm;