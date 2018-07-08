/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL in each feed', function() {
            function checkUrl(feed) {
                return !!feed.url;
            };

            /* Run each feed through checkUrl function 
            to check that URL is defined and not empty
            */
            expect(allFeeds.every(feed => checkUrl(feed))).toBe(true);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name in each feed', function() {
            function checkName(feed) {
                return !!feed.name;
            };

            /* Run each feed through checkName function 
            to check that name is defined and not empty
            */
            expect(allFeeds.every(feed => checkName(feed))).toBe(true);
        });
    });


    /* A new test suite named "The Menu" */
    describe('The Menu', function() {
        let menu, menuIcon, firstClick, secondClick;

        /* A test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        it('should hide by default', function() {
            // Check for class that hides menu
            menu = $('body').hasClass('menu-hidden');

            expect(menu).toBe(true);
        });
       
       
        /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('should toggle when clicked', function() {
            menuIcon = $('.menu-icon-link');

            // Click on menu once to toggle and show
            menuIcon.click();
            firstClick = $('body').hasClass('menu-hidden');
            // Click on menu again to toggle and hide
            menuIcon.click();
            secondClick = $('body').hasClass('menu-hidden');

            expect(firstClick).toBe(false);
            expect(secondClick).toBe(true);
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Grab all .entry who are children of .feed and check that length > 1
        it('ensure at least single entry element within feed container', function() {
           expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    
    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let udacityFeed, cssFeed;

        beforeEach(function(done) {
            // Load Udacity feed and save entries
            loadFeed(0, function() {
                udacityFeed = $('.feed .entry').text();
                // Load CSS Tricks feed and save entries after first callback finishes
                loadFeed(1, function() {
                    cssFeed = $('.feed .entry').text();
                    done();
                });
            });
        });

        // Compare the two entries to make sure they are different
        it('should change content', function() {
            expect(udacityFeed).not.toEqual(cssFeed);
        });
    });
}());
