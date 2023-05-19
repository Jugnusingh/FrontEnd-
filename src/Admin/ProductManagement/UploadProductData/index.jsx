import React, { useState } from 'react';
// import "./index.css"


const UploadProduct = ({ categories }) => {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("")
    const [Category, setCategory] = useState(categories);
    const [Price, setPrice] = useState(0);
    const [Image, setImage] = useState("");
    const [Pdf, setPdf] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Title', Title);
        formData.append('Description', Description);
        formData.append('Category', Category)
        formData.append('Price', Price);
        formData.append('Image', Image);
        formData.append('Pdf', Pdf)

        const url = 'http://127.0.0.1:4000/product';
        const response = await fetch(url,
            {
                method: 'POST',
                body: formData,
            });

        if (response.ok) {
            const data = await response.json();
            console.log('Product added successfully:', data);
        } else {
            console.error('Error adding product:', response.statusText);
        }
    }

    return (
        <div >
            <div className="upload_container">
                <center><h1> Product Upload</h1></center>
                <form onSubmit={submitHandler} >
                    <div className='dv-fm'>
                        <div className='fm-div'>
                            <div className="group">
                                <input type="text" name='Title' onChange={(e) => setTitle(e.target.value)} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Title</label>
                            </div>
                            <div className="group">
                                <input type="number" name='Price' onChange={(e) => setPrice(e.target.value)} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Price</label>
                            </div>
                            <div className="group">
                                <textarea name='Description' className="textar" placeholder='Description' onChange={(e) => setDescription(e.target.value)} ></textarea>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                            </div>
                            <div className="select">
                                <select value={Category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Select">Your Category</option>
                                    {categories.map((item) => (
                                        <option key={item._id} value={item.category}>
                                            {item.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='upload-div'>
                            <h3>Upload Images </h3>
                            <div className="group">
                                <input type="file" name="Image" accept="Image/*" onChange={(e) => setImage(e.target.files[0])} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                            </div>
                            <h3>Upload Product Pdf </h3>
                            <div className="group">
                                <input type="file" name="Pdf" accept="application/Pdf" onChange={(e) => setPdf(e.target.files[0])} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                            </div>
                            <div>
                                <input className='button' type="submit" value="Submit" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadProduct
