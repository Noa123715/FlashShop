export default function Index() {
  const cartItems = [
    {
      id: 1,
      name: "פאזל מודפס",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/5ae6aa3bd4d1f526830dc84b01d85a4309598cde?width=190",
      price: 45.90,
      quantity: 1,
    },
    {
      id: 2,
      name: "כרית מפנקת",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4228c37ae312f1fce0bb85fefbdb2eddbba676e1?width=190",
      price: 29.80,
      quantity: 1,
    },
    {
      id: 3,
      name: "תמונות לפיתוח",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/97f882a9accefb67e6e159a2af5dbcb7f5aedcd7?width=190",
      price: 26.00,
      quantity: 26,
    },
  ];

  const recommendedProducts = [
    {
      id: 1,
      name: "פאזל מודפס",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/295c584ca02f3f681e3e9fbaaec6e28dba8fdc89?width=318",
      price: 45.90,
    },
    {
      id: 2,
      name: "פאזל מודפס",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/1458b5fa5360a3cb8d536e320719425cf740a8cc?width=321",
      price: 45.90,
    },
  ];

  const total = cartItems.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="relative bg-white py-6 md:py-8 px-6 md:px-8">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-5">
            <button className="hover:opacity-80 transition-opacity" aria-label="Shopping Cart">
              <svg className="w-4 h-4 md:w-[17px] md:h-[17px]" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.1278 11.1867L14.8434 10.3006C14.9674 10.2862 15.0833 10.2258 15.1725 10.129C15.2617 10.0322 15.3188 9.90474 15.3347 9.76729L16.0245 3.79845C16.0343 3.71359 16.028 3.62741 16.0061 3.5454C15.9842 3.46339 15.9472 3.38736 15.8973 3.32218C15.8475 3.257 15.786 3.2041 15.7168 3.16686C15.6475 3.12962 15.572 3.10885 15.4952 3.1059L4.48643 2.70267L3.72593 0.675418C3.68746 0.573623 3.6251 0.485199 3.54537 0.419402C3.46563 0.353606 3.37146 0.312857 3.27271 0.301421L0.608679 0.00302882C0.462514 -0.0131464 0.316558 0.0359154 0.202919 0.139421C0.0892804 0.242927 0.0172678 0.392398 0.00272345 0.554953C-0.0118209 0.717507 0.0322942 0.87983 0.125364 1.00621C0.218434 1.13259 0.352835 1.21268 0.499 1.22885L2.83399 1.48692L6.21502 10.48L5.71829 11.0919V11.099C5.48261 11.4014 4.76652 12.3137 5.11369 13.1605C5.21486 13.3988 5.38323 13.5938 5.5932 13.7159C5.35738 13.9576 5.18969 14.2702 5.11045 14.6157C5.0312 14.9613 5.04382 15.325 5.14678 15.6627C5.24973 16.0005 5.43859 16.2977 5.69044 16.5185C5.9423 16.7392 6.24634 16.8739 6.56568 16.9063C6.88503 16.9386 7.20595 16.8672 7.48953 16.7008C7.77311 16.5343 8.00717 16.2799 8.16331 15.9684C8.31944 15.6569 8.39096 15.3017 8.36918 14.9459C8.34739 14.5901 8.23325 14.249 8.04059 13.9639H12.5021C12.317 14.2384 12.2046 14.5649 12.1774 14.9066C12.1503 15.2483 12.2094 15.5916 12.3483 15.898C12.4872 16.2043 12.7002 16.4614 12.9634 16.6403C13.2265 16.8192 13.5294 16.9128 13.8379 16.9105C14.1463 16.9083 14.4481 16.8103 14.7091 16.6276C14.9702 16.4449 15.1802 16.1847 15.3154 15.8764C15.4507 15.5681 15.5058 15.2239 15.4746 14.8826C15.4435 14.5413 15.3272 14.2165 15.1389 13.9448C15.2697 13.9086 15.384 13.8206 15.4604 13.6972C15.5368 13.5738 15.57 13.4236 15.5537 13.2749C15.5374 13.1261 15.4728 12.9892 15.372 12.8897C15.2713 12.7903 15.1413 12.7353 15.0066 12.7351H6.49148C6.36653 12.7325 6.24329 12.7023 6.1289 12.6464C6.1425 12.5698 6.20958 12.3439 6.54859 11.9085L7.1278 11.1867Z" fill="#F2665E"/>
              </svg>
            </button>
            <button className="hover:opacity-80 transition-opacity" aria-label="Search">
              <svg className="w-[19px] h-[18px] md:w-[19px] md:h-[18px]" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.8623 2.5459C4.20133 -0.28785 8.22857 -0.533259 10.8477 2.00586C13.0998 4.18899 13.5685 7.71245 12.1582 10.4492L12.3223 10.6084L12.3506 10.6357C12.3888 10.6284 12.4298 10.6253 12.4736 10.6299C12.6068 10.6438 12.7165 10.7172 12.8047 10.8027L17.6211 15.4707C17.9865 15.8254 18.0297 16.4237 17.7051 16.8174L17.2715 17.3428C16.9358 17.749 16.3491 17.7697 15.9727 17.4053L11.1562 12.7363C11.066 12.6488 10.9941 12.5444 10.9697 12.4189C10.9601 12.3692 10.9598 12.322 10.9648 12.2773L10.9248 12.2383L10.8779 12.1924C8.49799 14.5359 4.81199 14.6012 2.36035 12.2246C-0.247456 9.6973 -0.467052 5.36772 1.8623 2.5459ZM9.79883 3.21289C7.82563 1.30055 4.80041 1.48005 3.03125 3.62305C1.2627 5.76554 1.42339 9.05347 3.37598 10.9824L3.41016 11.0156C5.38339 12.9286 8.40851 12.7488 10.1777 10.6055C11.9563 8.4509 11.7839 5.13703 9.79883 3.21289Z" fill="#F2665E" stroke="#F2665E" strokeWidth="0.5"/>
              </svg>
            </button>
          </div>
          
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/ccb4c3e04e6f69e9b8a078d750352c9f04ee036d?width=190" 
            alt="Logo" 
            className="h-12 md:h-[58px] w-auto"
          />
          
          <button className="flex flex-col gap-[7px] hover:opacity-80 transition-opacity" aria-label="Menu">
            <div className="w-[22px] h-[2px] bg-coral rounded-full"></div>
            <div className="w-[22px] h-[2px] bg-coral rounded-full"></div>
            <div className="w-[22px] h-[2px] bg-coral rounded-full"></div>
          </button>
        </div>
      </header>

      {/* Hero Section with Wave */}
      <div className="relative h-32 md:h-36 lg:h-40 overflow-hidden bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white z-10">
          עגלת קניות
        </h1>
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 474 112" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M522.087 0.000114441L-48.0869 6.18429e-05L-48.0869 85.9047C-29.2151 80.1532 -10.8142 73.8166 9.25965 72.9301C31.0678 71.9675 51.9056 76.4551 72.1533 83.9276C91.5029 91.0676 110.197 99.9839 130.3 105.126C150.548 110.303 171.653 111.816 192.542 110.895C235.945 108.976 277.845 97.1757 319.669 86.9124C353.661 78.5708 388.337 71.2681 423.579 70.7591C455.659 70.2951 489.554 75.7903 515.363 95.2644C517.695 97.0199 519.929 98.8794 522.087 100.822L522.087 0.000114441Z" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <rect width="100%" height="100%" fill="url(#gradient0)" />
            </pattern>
            <linearGradient id="gradient0" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#93c5fd', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Cart Content */}
      <main className="max-w-md mx-auto px-6 md:px-8 py-6 md:py-8">
        {/* Items Count Badge */}
        <div className="bg-coral rounded-[24px] py-3 px-6 text-center mb-6">
          <p className="text-white text-sm">יש לי 3 פריטים בסל</p>
        </div>

        {/* Cart Table */}
        <div className="mb-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-3 mb-3 px-2">
            <div className="col-span-6 text-center text-xs font-semibold text-[#414042]">
              פריטים
            </div>
            <div className="col-span-3 text-center text-xs font-semibold text-[#414042]">
              כמות
            </div>
            <div className="col-span-2 text-center text-xs font-semibold text-[#414042]">
              מחיר
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Cart Items */}
          <div className="space-y-5">
            {cartItems.map(function(item) {
              return (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-center px-2">
                  <div className="col-span-6 flex items-center gap-3 justify-end">
                    <span className="text-base text-[#414042]">{item.name}</span>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-[95px] h-[75px] rounded-[16px] object-cover flex-shrink-0"
                    />
                  </div>
                  <div className="col-span-3 text-center text-sm text-[#414042]">
                    {item.quantity}
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-sm text-[#414042]">{item.price.toFixed(2)} </span>
                      <span className="text-[10px] text-[#414042]">ש"ח</span>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button className="text-[#414042] text-[10px]">X</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total and Checkout */}
        <div className="space-y-4 mb-16">
          <div className="bg-coral rounded-[24px] py-3 px-6 flex justify-between items-center">
            <div className="text-white text-sm">
              <span className="font-semibold">{total.toFixed(2)} </span>
              <span>ש"ח</span>
            </div>
            <span className="text-white text-sm">סה"כ לתשלום:</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-coral hover:bg-coral/90 text-white rounded-[36px] py-3 text-sm transition-colors">
              רוצה לשלם
            </button>
            <button className="bg-coral/40 hover:bg-coral/50 text-coral rounded-[36px] py-3 text-sm transition-colors">
              יש לי קופון
            </button>
          </div>
        </div>

        {/* Recommendations Section */}
        <section className="py-8">
          <h2 className="text-[25px] font-semibold text-coral text-center mb-10">
            אולי תאהבו גם את אלה...
          </h2>

          <div className="grid grid-cols-2 gap-6 mb-10">
            {recommendedProducts.map(function(product) {
              return (
                <div key={product.id} className="text-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-square rounded-[24px] object-cover mb-3"
                  />
                  <h3 className="text-xs mb-2 text-black">{product.name}</h3>
                  <p className="text-sm">
                    <span className="font-semibold text-black">{product.price.toFixed(2)} </span>
                    <span className="text-[10px] text-black">ש"ח</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button className="bg-white hover:bg-gray-50 text-coral rounded-[36px] py-2 px-8 text-sm transition-colors shadow-md">
              דברו איתנו
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}