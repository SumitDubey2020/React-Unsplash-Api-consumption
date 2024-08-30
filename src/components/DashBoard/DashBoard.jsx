import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashBoard.css'
import Modal from 'react-modal';
import Pagination from 'react-js-pagination';
import './Pagination.css'
const DashBoard =() => {

  const [images, setImages] = useState([]);
  const [numPage, setNumPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const accessKey = '29w_1d0SlWxevEVypGwfbgkfmYWuRSy6f525zMA5FYQ';
 
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]); // Runs on component mount or navigate change
  const handleLogout = () => {
    localStorage.setItem('auth', JSON.stringify(false)); 
    navigate('/login');
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let url;
        if (search) {
          url = `https://api.unsplash.com/search/photos?page=${numPage}&query=${search}&client_id=${accessKey}`;
        } else {
          url = `https://api.unsplash.com/photos?page=${numPage}&client_id=${accessKey}`;
        }
        
        const response = await axios.get(url);
        setImages(search ? response.data.results : response.data);
        setTotalItems(search ? response.data.total : response.data.length);
        setError(null); // Clear previous errors
      } catch (error) {
        console.error("Error in fetching images", error);
        setError("Failed to fetch images. Please try again later.");
      }
    };

    fetchImages();
  }, [numPage, search]);

  const handlePageChange = (pageNumber) => {
    setNumPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(query);
    setNumPage(1);
  };
  return (
    
    <section className='dashboard-section'>
      <div className="row dashboard-head-row">
        <div className="col-xl-8 col-lg-18 col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSearch} className='d-flex'>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images..."
               className='search_input'
              />
            <button type="submit" className="search-btn">
                  Search
            </button>
          </form>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className='row mt-5  justify-content-center'>
            {images.map((image) => (
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 d-flex flex-column justify-content-center align-items-center"key={image.id} style={{ margin: '10px' }}>
                <div className="image-card d-flex flex-column p-4">
                  <img className='grid-img'
                    id={image.id}
                    src={image.urls.small}
                    alt={image.alt_description}
                    style={{ }}
                    onClick={() => setSelectedImage(image)}
                    
                  />
                  <h4 className='mb-4 mt-3'>{image.alt_description || "No Description"}</h4>
                  <p><span className='price_tag'>Price &nbsp; 50$</span></p>
                  <p className='card_content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sequi mollitia maxime, consequuntur minima commodi veritatis cupiditate nesciunt at quia.</p>
                  <button className="view-more" onClick={() => setSelectedImage(image)}>View More</button>
                </div>
               
              </div>
            ))}


{images.length > 0 && (
          <div className="wrapPagination">
            <Pagination
              activePage={numPage}
              itemsCountPerPage={5}
              totalItemsCount={totalItems}
              onChange={handlePageChange}
              hideFirstLastPages={true}
              prevPageText="<"
              nextPageText=">"
            />
          </div>
        )}
          </div>
          <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        contentLabel="Image Detail"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            height: 'auto',
            maxHeight: '90vh', 
            overflowY: 'auto', 
            textAlign: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          },
        }}
      >
        {selectedImage && (
          <div className='modal-content'>
            <h1>{"Image Detail"}</h1>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
            <p>Photographer: {selectedImage.user.name}</p>
            <p>{selectedImage.description}</p>
            <p>Likes: {selectedImage.likes}</p>
            <div style={{textAlign:'center'}}>
            <button className="btn btn-danger"onClick={() => setSelectedImage(null)} style={{ marginTop: '20px' }}>
              Close
            </button>
            </div>
           
          </div>
        )}
      </Modal>
    </section>
    
  
   
  )
}

export default DashBoard
