<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="WP_V2_Products_API_0"></a>WP V2 Products API</h1>
Wordpress product api setup with node

<h2 class="code-line" data-line-start=1 data-line-end=2 ><a id="Deploying_wordpress_woocommerce_APIs_using_Node_js_1"></a>Deploying wordpress woocommerce APIs using Node js</h2>
<p class="has-line-data" data-line-start="4" data-line-end="5">Please note that these instructions assume a basic Ubuntu server setup and may need adjustments based on your specific server environment. To get started:</p>
<ul>
<li class="has-line-data" data-line-start="6" data-line-end="7">ssh into terminal</li>
<li class="has-line-data" data-line-start="7" data-line-end="8">check into root directory, i.e. cd var/www/root for instance</li>
<li class="has-line-data" data-line-start="8" data-line-end="10">✨Work your Magic ✨</li>
</ul>
<h2 class="code-line" data-line-start=10 data-line-end=11 ><a id="Features_10"></a>Features</h2>
<ul>
<li class="has-line-data" data-line-start="12" data-line-end="13">This process typically involves the use of mainly node express and axios</li>
</ul>
<h2 class="code-line" data-line-start=15 data-line-end=16 ><a id="Step_1_Create_a_Nodejs_Application_15"></a>Step 1: Create a Node.js Application:</h2>
<p class="has-line-data" data-line-start="16" data-line-end="17">First, create a Node.js application by installing necessary packages. In your project directory:</p>
<pre><code class="has-line-data" data-line-start="18" data-line-end="24" class="language-sh">mkdir node-api
<span class="hljs-built_in">cd</span> node-api
npm init -y
npm install express
npm install axios
</code></pre>
<p class="has-line-data" data-line-start="24" data-line-end="25">Create your app.js file within your node-api directory</p>
<pre><code class="has-line-data" data-line-start="26" data-line-end="28" class="language-sh">touch app.js
</code></pre>
<h2 class="code-line" data-line-start=29 data-line-end=30 ><a id="Step_2_Edit_and_Configure_Appjs_29"></a>Step 2: Edit and Configure App.js</h2>
<p class="has-line-data" data-line-start="30" data-line-end="31">You may edit into the app.js file by:</p>
<pre><code class="has-line-data" data-line-start="32" data-line-end="34" class="language-sh">sudo nano app.js
</code></pre>
<h2 class="code-line" data-line-start=35 data-line-end=36 ><a id="Step_3_Configure_Appjs_using_wordpress_woocommerce_endpoints_35"></a>Step 3: Configure App.js using wordpress woocommerce endpoints</h2>
<p class="has-line-data" data-line-start="36" data-line-end="37">Worthy mention that in modern wordpress installations with updated products, endpoints can be hooked through:</p>
<p class="has-line-data" data-line-start="38" data-line-end="40"><code>http://your-wordpress-site/wp-json/wp/v2/products</code><br>
Below is a sample configuration for app.js while setting up endpoints to get products and id of a product using product/:id</p>
<pre><code class="has-line-data" data-line-start="41" data-line-end="109" class="language-sh">const express = require(<span class="hljs-string">'express'</span>);
const axios = require(<span class="hljs-string">'axios'</span>);
const app = express();
const PORT = <span class="hljs-number">8000</span>;

// Function to fetch products from the WordPress REST API
const getWordPressProducts = async () =&gt; {
    try {
        const response = await axios.get(<span class="hljs-string">'http://127.0.0.1/wp-json/wp/v2/product'</span>);
        <span class="hljs-built_in">return</span> response.data;
    } catch (error) {
        console.error(<span class="hljs-string">'Error fetching products from WordPress:'</span>, error.message);
        <span class="hljs-built_in">return</span> [];
    }
};

// Function to fetch details about a specific product by ID
const getWordPressProductDetails = async (productId) =&gt; {
    try {
        const response = await axios.get(`http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>/wp-json/wp/v2/product/<span class="hljs-variable">${productId}</span>`);

        // Extract relevant attributes from the response
        const productDetails = {
            title: response.data.title.rendered,
            date: response.data.date,
            tags: response.data.tags,
            categories: response.data.categories,
            description: response.data.content.rendered,
            featuredImage: response.data.featured_media ? response.data.featured_media.source_url : null,
        };

        <span class="hljs-built_in">return</span> productDetails;
    } catch (error) {
        console.error(`Error fetching details <span class="hljs-keyword">for</span> product with ID <span class="hljs-variable">${productId}</span>:`, error.message);
        throw error; // Re-throw the error to be caught by the error handling middleware
    }
};

// Middleware <span class="hljs-keyword">for</span> parsing JSON
app.use(express.json());

// Route to list all products
app.get(<span class="hljs-string">'/products'</span>, async (req, res) =&gt; {
    const wordpressProducts = await getWordPressProducts();
    res.json(wordpressProducts);
});

// Route to get details about a specific product
app.get(<span class="hljs-string">'/product/:id'</span>, async (req, res, next) =&gt; {
    try {
        const productId = parseInt(req.params.id);
        const productDetails = await getWordPressProductDetails(productId);
        res.json(productDetails);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// Error handling middleware
app.use((err, req, res, next) =&gt; {
    console.error(err.stack);
    res.status(<span class="hljs-number">500</span>).json({ error: <span class="hljs-string">'Internal Server Error'</span> });
});

app.listen(PORT, <span class="hljs-string">'37.27.11.209'</span>, () =&gt; {
    console.log(`Server running on http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-variable">${PORT}</span>`);
});
</code></pre>
<p class="has-line-data" data-line-start="109" data-line-end="110">In my case i tried to separate some parameters i while fetching a product’s detail.</p>
<h2 class="code-line" data-line-start=111 data-line-end=112 ><a id="Step_3_Configure_Nginx_to_work_with_Node_111"></a>Step 3: Configure Nginx to work with Node</h2>
<pre><code class="has-line-data" data-line-start="113" data-line-end="134" class="language-sh">server {
        <span class="hljs-comment"># ... (existing configuration)</span>

        location / {
            <span class="hljs-comment"># Your existing WordPress configuration</span>
            try_files <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.php?<span class="hljs-variable">$args</span>;
        }

        location / {
              proxy_pass http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8000</span>;
              proxy_http_version <span class="hljs-number">1.1</span>;
              proxy_<span class="hljs-built_in">set</span>_header Upgrade <span class="hljs-variable">$http_upgrade</span>;
              proxy_<span class="hljs-built_in">set</span>_header Connection <span class="hljs-string">'upgrade'</span>;
              proxy_<span class="hljs-built_in">set</span>_header Host <span class="hljs-variable">$host</span>;
              proxy_cache_bypass <span class="hljs-variable">$http_upgrade</span>;
               include /etc/nginx/proxy_params;
       }
       
       <span class="hljs-comment"># ... (existing configuration)</span>
}
</code></pre>
<p class="has-line-data" data-line-start="135" data-line-end="136">Endeavour to restart nginx server after changes:</p>
<pre><code class="has-line-data" data-line-start="137" data-line-end="139" class="language-sh">sudo systemctl restart nginx
</code></pre>
<h2 class="code-line" data-line-start=139 data-line-end=140 ><a id="Step_5_You_may_test_your_Node_setup_Appjs_139"></a>Step 5: You may test your Node setup App.js</h2>
<p class="has-line-data" data-line-start="140" data-line-end="141">This is mainly for troubleshooting purposes:</p>
<pre><code class="has-line-data" data-line-start="142" data-line-end="144" class="language-sh">curl http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8000</span>
</code></pre>
<p class="has-line-data" data-line-start="144" data-line-end="145">OR</p>
<pre><code class="has-line-data" data-line-start="146" data-line-end="148">node app.js
</code></pre>
<p class="has-line-data" data-line-start="149" data-line-end="150">You should get a message telling you the node server is running on that port.</p>
<h2 class="code-line" data-line-start=151 data-line-end=152 ><a id="Step_6_Test_your_Node_Server_151"></a>Step 6: Test your Node Server</h2>
<p class="has-line-data" data-line-start="152" data-line-end="153">You may test your node server by visiting the designated number with PORT</p>
<pre><code class="has-line-data" data-line-start="154" data-line-end="156" class="language-sh"><span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8000</span>
</code></pre>
<p class="has-line-data" data-line-start="157" data-line-end="158">Sometimes, you may encounter common errors such as connection refused; don’t worry, it just means either your node or server setup is with a wrong configuration. I’d advise you look at your domain addresses or ips.</p>
<h2 class="code-line" data-line-start=159 data-line-end=160 ><a id="Contributors_159"></a>Contributor(s)</h2>
<p class="has-line-data" data-line-start="160" data-line-end="161">Jephthah Idogbo</p>
