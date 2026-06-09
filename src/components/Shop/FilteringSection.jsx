

const FilteringSection = ({
    priceRange, 
    handlePriceChange,
    categories,
    selectedCategory,
    handleCategoryChange, 
    searchQuery,
    handleSearchQuery,
    sortOrder,
    handleSortOrder
    }) => {
    return (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Section */}
            <div className="bg-white p-4 rounded-lg shadow">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    Price Range
                </label>

                <span className="flex justify-start text-xs text-gray-500 mb-1">Minimum</span>
                {/* min range */}
                <div className="flex items-center space-x-4">
                    <input 
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                        className="w-20 p-2 border rounded-md"
                    />
                    <input 
                        type="range"
                        min="0"
                        max={priceRange[1]}
                        step="5"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                        className="w-full"
                    />
                </div>
                {/* max range */}
                <span className="flex justify-start text-xs text-gray-500 mb-1">Maximum</span>
                <div className="flex items-center space-x-4">
                    <input 
                        type="number"
                        min={priceRange[0]}
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                        className="w-20 p-2 border rounded-md"
                    />
                    <input 
                        type="range"
                        min={priceRange[0]}
                        max="1000"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            {/* category filter */}
            <div className="bg-white p-4 rounded-lg shadow">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                </label>
                <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category)  => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* search */}
            <div className="bg-white p-4 rounded-lg shadow">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                </label>
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchQuery(e.target.value)}
                    placeholder="Search what you want..." 
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* sorting */}
            <div className="bg-white p-4 rounded-lg shadow">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By Price
                </label>
                <select 
                    className="w-full p-2 border rounded-md"
                    value={sortOrder}
                    onChange={(e) => handleSortOrder(e.target.value)}
                >
                    <option value="">Default</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default FilteringSection;