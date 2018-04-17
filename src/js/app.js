App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load cars.
    $.getJSON('cars.json', function(data) {
      var carsRow = $('#carsRow');
      var carTemplate = $('#carTemplate');

      for (i = 0; i < data.length; i ++) {
        carTemplate.find('.panel-title').text(data[i].name);
        carTemplate.find('img').attr('src', data[i].picture);
        carTemplate.find('.car-breed').text(data[i].breed);
        carTemplate.find('.car-score').text(data[i].score);
        carTemplate.find('.car-location').text(data[i].location);
        carTemplate.find('.btn-insure').attr('data-id', data[i].id);

        carsRow.append(carTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
  } else {
  // If no injected web3 instance is detected, fall back to Ganache
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
  }
  web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Insurance.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truf
      var InsuranceArtifact = data;
      App.contracts.Insurance = TruffleContract(InsuranceArtifact);
      // Set the provider for our contract
      App.contracts.Insurance.setProvider(App.web3Provider);
      // Use our contract to retrieve and mark the Insured cars
      return App.markInsured();
      });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markInsured: function(insurers, account) {
    var insuranceInstance;
    App.contracts.Insurance.deployed().then(function(instance) {
    insuranceInstance = instance;
    return insuranceInstance.getInsurers.call();
    }).then(function(insurers) {
    for (i = 0; i < insurers.length; i++) {
    if (insurers[i] !== '0x0000000000000000000000000000000000000000') {
    $('.panel-car').eq(i).find('button').text('Success').attr('disabled',true);
    }
    }
    }).catch(function(err) {
    console.log(err.message);
    });
  },

  handleInsure: function(event) {
    event.preventDefault();

    var carId = parseInt($(event.target).data('id'));

    var insuranceInstance;
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
    console.log(error);
    }
    var account = accounts[0];
    App.contracts.Insurance.deployed().then(function(instance) {
    insuranceInstance = instance;
    
    // Execute adopt as a transaction by sending account
    return insuranceInstance.adopt(carId, {from: account});
    }).then(function(result) {
    return App.markInsured();
    }).catch(function(err) {
    console.log(err.message);
    });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

