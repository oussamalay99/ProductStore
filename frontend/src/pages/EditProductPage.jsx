import { useAuth } from "@clerk/react";
import { Link, useNavigate, useParams } from "react-router";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { userId } = useAuth();

  const { data: product, isLoading } = useProduct(productId);
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingSpinner />;

  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {!product ? "Not Found!" : "Access Denied"}
          </h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { productId, ...formData },
          { onSuccess: () => navigate(`/product/${productId}`) },
        );
      }}
    />
  );
};
export default EditProductPage;
