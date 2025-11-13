
export default function RecommendedProduct({ product }) {
  return (
    <article className="border border-gray-200 rounded-lg shadow-md overflow-hidden text-center bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.price.toFixed(2)} ש"ח</p>
      </div>
    </article>
  );
}