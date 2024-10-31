/*
Plugin Name: Mypacco
Plugin URI:  http://seller.mypacco.com
Description: Got a Parcel to Send? We will take care of the rest... We help retail brands grow with seamless, omni-channel commerce solutions. From digital commerce, development, integration, and support to physical operations all the way to your customer’s doorstep, we help you outpace the competition like no other service provider. We’re experts in shipping and distributing parcels, through integrating the network of prime schedule airfreight services with the services of leading global postal systems, We deliver the most cost effective, scalable and process managed solution in today’s marketplace.
Version:     20160901
Author:      Harshwardhan Kohad
Author URI:  https://in.linkedin.com/in/harshwardhan-kohad-014a8258
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/
jQuery(document).ready( function()
{
    /*Track order*/
    jQuery("#track_order_submit").click(function(e)
    {
        if(jQuery("#track_order").validationEngine('validate') == true){

        e.preventDefault();
        var trackingNo,sdata;

        trackingNo = jQuery("#trackingNo").val();
        sdata = {trackingNo : trackingNo};

        jQuery.ajax({
            type : "POST",
            dataType : "json",
            url : mypacco_script_array.track_order_url,
            data : sdata,
			beforeSend: function () {
				jQuery('#data_loading').show();
			},
            success: function(response) 
			{
				jQuery('#data_loading').hide();
				jQuery("#track_data").html(response.html);
                console.log(response);
            }
          });
        return false;
        }
        else{
            jQuery("#track_order").validationEngine();
        }
    });
    /*End - Track order*/
	
	/*Search Pincode*/
    jQuery("#search_pincode_submit").click(function(e)
    {
        if(jQuery("#search_pincode").validationEngine('validate') == true){

        e.preventDefault();
        var pincodeNo,sdata;

        pincodeNo = jQuery("#pincodeNo").val();
        transport_mode = jQuery("#transport_mode").val();
        payment_type = jQuery("#payment_type").val();
        sdata = {pincode : pincodeNo,transport_mode : transport_mode,payment_type : payment_type};

        jQuery.ajax({
            type : "POST",
            dataType : "json",
            url : mypacco_script_array.validate_pincode_url,
            data : sdata,
			beforeSend: function () {
				jQuery('#data_loading').show();
			},
            success: function(response) 
			{
				console.log(response);
				jQuery('#data_loading').hide();
				if(response.msg == 'success')
				{
					jQuery("#search_data").html("<div class='alert alert-block alert-success fade in' style='width:500px;'><strong>Pincode : "+pincodeNo+" Servicable by Mypacco</strong></div>.");
					jQuery("#search_data").show();
					setTimeout(function () {
						jQuery('#search_data').html('');
						jQuery("#search_data").hide();
					}, 3000);
				}
				else
				{
					jQuery("#pincode").val('');
					jQuery("#search_data").html(response.html);
					jQuery("#search_data").show();
					jQuery('html, body').animate({ scrollTop: jQuery('#search_data').offset().top }, 'slow');
					setTimeout(function () {
						jQuery('#search_data').html('');
						jQuery("#search_data").hide();
					}, 3000);
				}
            }
          });
        return false;
        }
        else{
            jQuery("#search_pincode").validationEngine();
        }
    });

    /*Validate pincode*/
    jQuery("#pincode").keyup(function()
    {
        var pincode = jQuery("#pincode").val();

        if (pincode.length == 6)
        {
            var pincodeVal = {pincode: pincode};

            jQuery.ajax({
                type : "POST",
                dataType : "json",
                url : mypacco_script_array.validate_pincode_url,
                data : pincodeVal,
				beforeSend: function () {
					jQuery('#data_loading').show();
				},
                success: function(response)
                {
                    console.log(response);
					jQuery('#data_loading').hide();
                    if(response.msg == 'success')
                    {
                        jQuery("#city").val(response.city_name);
                        jQuery("#state").val(response.state_name);
                        jQuery("#country").val(response.country_name);
                    }
                    else
                    {
                        jQuery("#pincode").val('');
                        jQuery("#validationMSG").html(response.html);
                        jQuery("#validationMSG").show();
                        jQuery('html, body').animate({ scrollTop: jQuery('#validationMSG').offset().top }, 'slow');
                        setTimeout(function () {
                            jQuery('#validationMSG').html('');
                            jQuery("#validationMSG").hide();
                        }, 2000);
                    }
                }
            });
            return false;

        }
    });
    /*End Validate pincode*/

    /*Mypacco Config*/
    jQuery("#mypaccoconfigbtn").click(function(e)
    {
        e.preventDefault();

        var mp_config_data;

        mp_config_data = jQuery("#mypacco_config").serialize();

        jQuery.ajax({
            type : "POST",
            dataType : "json",
            url : mypacco_script_array.mypacco_config_url,
            data : mp_config_data,
            success: function(response) {
                jQuery("#validationMSG").html(response.html);
                jQuery("#validationMSG").show();
                jQuery('html, body').animate({ scrollTop: jQuery('#validationMSG').offset().top }, 'slow');
                setTimeout(function () {
                jQuery('#validationMSG').html('');
                jQuery("#validationMSG").hide();
                }, 2000);
                console.log(response);
            }
        });
        return false;
    });
    /*End - Mypacco Config*/

    jQuery('#warehouse_tbl').dataTable({
        dom: 'lBfrtip',
        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [ 0 ] }
        ],
        buttons: [
            'copy', 'csv', 'pdf', 'print'
        ],
        "pagingType": "full_numbers"
    });
	/* Applied Data table  */
    jQuery('#order_tbl').dataTable({
        dom: 'lBfrtip',
        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [ 0 ] }
        ],
        buttons: [
            'copy', 'csv', 'pdf', 'print'
        ],
        "pagingType": "full_numbers"
    });
	
	/*Add Order manual form*/
	/* @Rahul Sharma */
    jQuery("#addorder").click(function(e)
    {
		if(jQuery("#order-form").validationEngine('validate') == true){
            e.preventDefault();

            var order_data;

            order_data = jQuery("#order-form").serialize();

            jQuery.ajax({
                 type : "POST",
                 dataType : "json",
                 url : mypacco_script_array.add_order_form_url,
                 data : order_data,
				 beforeSend: function () {
					jQuery('#data_loading').show();
				},
                 success: function(response) {
					jQuery('#data_loading').hide(); 
                    jQuery("#validationMSG").html(response.html);
                    jQuery("#validationMSG").show();
                    jQuery('html, body').animate({ scrollTop: jQuery('#validationMSG').offset().top }, 'slow');
                    setTimeout(function () {
                    jQuery('#validationMSG').html('');
                    jQuery("#validationMSG").hide();
                    }, 2000);
                    console.log(response);
                 }
              });
            return false;
        }
        else{
             jQuery("#order-form").validationEngine();
        }
    });
    /*End - Add Order*/


    /*Add Warehouse*/
    jQuery("#addwarebtn").click(function(e)
    {
        if(jQuery("#add_warehouse").validationEngine('validate') == true){
            e.preventDefault();

            var warehouse_data;

            warehouse_data = jQuery("#add_warehouse").serialize();

            jQuery.ajax({
                 type : "POST",
                 dataType : "json",
                 url : mypacco_script_array.add_warehouse_url,
                 data : warehouse_data,
				 beforeSend: function () {
					jQuery('#data_loading').show();
				 },
                 success: function(response) {
					jQuery('#data_loading').hide();
                    jQuery("#validationMSG").html(response.html);
                    jQuery("#validationMSG").show();
                    jQuery('html, body').animate({ scrollTop: jQuery('#validationMSG').offset().top }, 'slow');
                    setTimeout(function () {
                    jQuery('#validationMSG').html('');
                    jQuery("#validationMSG").hide();
                    }, 2000);
                    console.log(response);
                 }
              });
            return false;
        }
        else{
             jQuery("#add_warehouse").validationEngine();
        }
    });
    /*End - Add Warehouse*/
	
	/* Edit Order Submit */
    jQuery("#editorderbtn").click(function(e)
    {
        if(jQuery("#edit_order").validationEngine('validate') == true){
            e.preventDefault();
			
			var order_data;
			order_data = jQuery("#edit_order").serialize();
			
            jQuery.ajax({
                type : "POST",
                dataType : "json",
                url : mypacco_script_array.edit_order_url,
                data : order_data,
				beforeSend: function () {
					jQuery('#data_loading').show();
				},
                success: function(response) {
					jQuery('#data_loading').hide();
                    jQuery("#validationMSG").html(response.html);
                    jQuery("#validationMSG").show();
                    jQuery('html, body').animate({ scrollTop: jQuery('#validationMSG').offset().top }, 'slow');
                    setTimeout(function () {
                    jQuery('#validationMSG').html('');
                    jQuery("#validationMSG").hide();
                    }, 2000);
                    console.log(response);
					setTimeout(function () {
                    top.location.replace(mypacco_script_array.mypacco_order_redirect_url);
                    }, 2000);
					
                 }
              });
            return false;
        }
        else{
             jQuery("#edit_order").validationEngine();
        }
    });
	/* Default order Loading call */
    getOrders(0,0);

});

 /*  Ready To Ship to select item detail Single order */

    function readytoship()
    {
        //bootbox.alert('Hello');
		var ids = '';
		jQuery('#order_tbl input[type=checkbox]').each(function ()
		{
			if (this.checked) {
				ids += jQuery(this).val()+'-';
			}
		
		});
		var orderids = {order_ids: ids};
		
		jQuery.ajax({
			type: "POST",
			url: mypacco_script_array.mypacco_Rts_Orders_url,
			dataType : "json",
			data: orderids,
			beforeSend: function () {
                jQuery('#data_loading').show();
            },
			success: function (data) {
				//alert(data);
				jQuery('#data_loading').hide(); 
				jQuery('#modelView').html(data.html);
                jQuery('#viewmodal').modal('show');
            }
        });
        return false;
    }
	
	
/* Function Use for order make rts and add detail in order_master table */
/* Return MypaccoID */
function makeRTS() 
{
	if(jQuery("#order_rts").validationEngine('validate') == true){
		var formdata = jQuery('#order_rts').serialize();
		jQuery.ajax({
			type: "POST",
			url: mypacco_script_array.mypacco_Rts_Orders_submit_url,
			dataType : "json",
			data: formdata,
			beforeSend: function () {
                jQuery('#data_loading').show();
            },
			success: function (data) {
				jQuery('#data_loading').hide(); 
				jQuery('#viewmodal').modal('hide');
				bootbox.alert(data.html);
				/* jQuery("#viewMessage").html('<strong>Sussess! </strong> Your order has been added sucessfully.');
				jQuery("#viewMessage").show(); */
				setTimeout(function () {
                    top.location.replace(mypacco_script_array.mypacco_order_redirect_url);
                    }, 2000);
				
				
			}
		});
		return false;
	}
	else{
		jQuery("#order_rts").validationEngine();
		return false;
	}

}

 /*  Ready To Ship to select item detail Combined order */

    function readytoshipcombined(id)
    {
        //bootbox.alert('Hello');
		var orderids = {order_ids: id};
		
		jQuery.ajax({
			type: "POST",
			url: mypacco_script_array.mypacco_Rts_combine_Orders_url,
			dataType : "json",
			data: orderids,
			beforeSend: function () {
                jQuery('#data_loading').show();
            },
			success: function (data) {
				//alert(data);
				jQuery('#data_loading').hide(); 
				jQuery('#modelView').html(data.html);
                jQuery('#viewmodal').modal('show');
				
            }
        });
        return false;
    }
	
	/* Combine Select Item Value and display in module  */
	function com_item(itemID)
	{
		/* Single Item Value */
		var height = jQuery("#height_"+itemID).val();
		var width = jQuery("#width_"+itemID).val();
		var length = jQuery("#length_"+itemID).val();
		var weight = jQuery("#weight_"+itemID).val();
		//alert(height);
		/* Combine Value */
		var com_height = jQuery("#com_height").val();
		var com_width = jQuery("#com_width").val();
		var com_length = jQuery("#com_length").val();
		var com_weight = jQuery("#com_weight").val();
		/* Add and Remove Value in combine column */
		if(jQuery('#check_item_'+itemID).prop('checked')) {
			var add_height = parseInt(height) + parseInt(com_height);
			var add_width = parseInt(width) + parseInt(com_width);
			var add_length = parseInt(length) + parseInt(com_length);
			var add_weight = parseFloat(weight) + parseFloat(com_weight);
		} else {
			var add_height =  parseInt(com_height)-parseInt(height);
			var add_width = parseInt(com_width)-parseInt(width);
			var add_length =  parseInt(com_length)-parseInt(length);
			var add_weight =  parseFloat(com_weight)-parseFloat(weight);
		}
		var numberOfChecked = jQuery('input:checkbox:checked').length;
		
		var val_cal = parseFloat((add_height * add_width * add_length) / 5000);
		/* Set Value for combine column */
		if(numberOfChecked == 0){
			jQuery('#com_height').val('0');
			jQuery('#com_width').val('0');
			jQuery('#com_length').val('0');
			jQuery('#com_weight').val('0.00');
			jQuery('#com_valuemetric').val('0.00');
			jQuery('#com_height').prop('readonly', true);
			jQuery('#com_width').prop('readonly', true);
			jQuery('#com_length').prop('readonly', true);
		}else{
			jQuery('#com_height').val(add_height);
			jQuery('#com_width').val(add_width);
			jQuery('#com_length').val(add_length);
			jQuery('#com_weight').val(add_weight);
			jQuery('#com_valuemetric').val(val_cal);
			jQuery('#com_height').prop('readonly', false);
			jQuery('#com_width').prop('readonly', false);
			jQuery('#com_length').prop('readonly', false);
		}
	}
	
	/* Combine Select Item Value and display in module  */
	function val_weight()
	{
		/* Combine Value */
		var com_height = jQuery("#com_height").val();
		var com_width = jQuery("#com_width").val();
		var com_length = jQuery("#com_length").val();
		//alert(height);
		
		var val_cal = parseFloat((com_height * com_width * com_length) / 5000);
		/* Set Value for combine column */
		jQuery('#com_valuemetric').val(val_cal);
	}

/* Function Use for order make combine order rts and add detail in order_master table */
/* Return Mypacco Combined ID*/
function makeCombineRTS() 
{
	if(jQuery("#combine_order_rts").validationEngine('validate') == true)
	{
		var ids = '';
		jQuery('#order_rts_tbl input[type=checkbox]').each(function ()
		{
			if (this.checked) {
				ids += jQuery(this).val()+'-';
			}
		});
		var orderids = {order_ids: ids};
		if(ids == ''){
			bootbox.alert('Please Select Order !!');
			return false;
		}
		
		var formdata = jQuery('#combine_order_rts').serialize();
		
		jQuery.ajax({
			type: "POST",
			url: mypacco_script_array.mypacco_combine_Rts_Orders_submit_url,
			dataType : "json",
			data: formdata,
			success: function (data) {
				jQuery('#viewmodal').modal('hide');
				bootbox.alert(data.html);
				/* jQuery("#viewMessage").html('<strong>Sussess! </strong> Your order has been added sucessfully.');
				jQuery("#viewMessage").show(); */
				setTimeout(function () {
                    top.location.replace(mypacco_script_array.mypacco_order_redirect_url);
                    }, 2000);
				//top.location.replace(mypacco_script_array.mypacco_order_redirect_url);
				
			}
		});
		return false;
	}
	else{
		jQuery("#combine_order_rts").validationEngine();
		return false;
	}

}

/* Valuemetric weight */

function valweight()
{
	var height = jQuery("#height").val();
	var width = jQuery("#width").val();
	var length = jQuery("#length").val();
	if(height != '' && width != '' && length !=''){
		var val_weight = (height * width * length)/5000;
		jQuery('#val_weight').val(val_weight);
	}
	
}

/* View Order Data */

function viewOrder(orderID)
{
	var orderdata = {order_id: orderID};
	jQuery.ajax({
		type: "POST",
		url: mypacco_script_array.mypacco_view_order_url,
		dataType : "json",
		data: orderdata,
		beforeSend: function () {
            jQuery('#data_loading').show();
        },
		success: function (data) {
			jQuery('#data_loading').hide();
			jQuery('#orderView').html(data.html);
			jQuery('#viewordermodal').modal('show');
		}
	});

    return false;
	
}

/* Refresh Status */

function realoadstatus(order_status, divindex)
{
	var orderstatus = {order_status: order_status};
	jQuery.ajax({
		type: "POST",
		url: mypacco_script_array.mypacco_Orders_status_url,
		dataType : "json",
		data: orderstatus,
		beforeSend: function () {
            jQuery('#data_loading').show();
        },
		success: function (data) {
			jQuery('#data_loading').hide();
			jQuery('#viewmodal').modal('hide');
			//top.location.replace(mypacco_script_array.mypacco_order_redirect_url);
		}
	});

    return false;
	
}

/* Edit Order */

function edit_order(id)
{
	var orderid = {order_id: id};
	jQuery.ajax({
		type: "POST",
		url: mypacco_script_array.mypacco_Orders_status_url,
		dataType : "json",
		data: orderid,
		success: function (data) {
			//alert(data);
			jQuery('#viewmodal').modal('hide');
		}
	});

    return false;
	
}

function getOrders(order_status_id, divindex)
{
    //get table headers
    
    var orderstatus = {order_status: order_status_id};
	
    jQuery.ajax({
        type : "POST",
        dataType : "json",
        url : mypacco_script_array.mypacco_order_url,
        data : orderstatus,
		beforeSend: function () {
            jQuery('#data_loading').show();
        },
        success: function(response) {
			
			jQuery('#data_loading').hide();  
            jQuery("#viewOrders").html(response.html);
            jQuery("#viewOrders").show();
            //jQuery('html, body').animate({ scrollTop: jQuery('#viewOrders').offset().top }, 'slow');
            console.log(response);
            jQuery('#order_tbl').dataTable({
                dom: 'lBfrtip',
                "aoColumnDefs": [
                    { 'bSortable': false, 'aTargets': [ 0 ] }
                ],
                buttons: [
                    'copy', 'csv', 'pdf', 'print'
                ],
                "pagingType": "full_numbers"
            });
        }
      });
    //return false;
	realoadstatus(1,divindex)
    for (var i = 0; i <= 8; i++) {
        if (i == divindex) {
            jQuery("#default-title-" + i + "").addClass("current-step");//.removeClass('alert alert-success')
        } else {
            jQuery("#default-title-" + i + "").removeClass("current-step");//.removeClass('alert alert-success')
        }
    }
}


    /* Add new order from wp_post to wp_mypacco_order_master */
    function add_new_order()
    {
		jQuery.ajax({
			type : "POST",
			dataType : "json",
			url : mypacco_script_array.mypacco_add_new_order_url,
			beforeSend: function () {
                jQuery('#data_loading').show();
            },
			success: function(response) {
				jQuery('#data_loading').hide();  
				jQuery("#viewMessage").html('<strong>Sussess! </strong> Your order has been added sucessfully.');
				bootbox.alert('Your order has been added sucessfully.');
				jQuery("#viewMessage").show();
				jQuery('html, body').animate({ scrollTop: jQuery('#viewMessage').offset().top }, 'slow');
				setTimeout(function () {
				jQuery('#viewMessage').html('');
				jQuery("#viewMessage").hide();
				}, 3500);
				console.log(response);
				setTimeout(function () {
				top.location.replace(mypacco_script_array.mypacco_order_redirect_url);
				}, 2000);
				
			}
		});
	}
	
	//select all checkboxes
	function selectall(source)
	{ 
		//bootbox.alert('Hello');
		checkboxes = document.getElementsByName('check_rts');
		  for(var i=0, n=checkboxes.length;i<n;i++) {
			checkboxes[i].checked = source.checked;
		}
	}
	
	/* Get Order Documents(invoice,shipping,manifest) */
	function getdocuments()
	{
		var ids = '';
		jQuery('#order_tbl input[type=checkbox]').each(function ()
		{
			if (this.checked) {
				ids += jQuery(this).val()+'-';
			}
		});
		var orderids = {order_ids: ids};
		if(ids == ''){
			bootbox.alert('Please Select Order !!');
			return true;
		}
		
		window.open('admin-ajax.php?action=get_document&id='+ids, '_blank');
	}

    /* Cancel Order */
	function cancel_order(id)
	{
		var orderid = {order_id: id};
		jQuery.ajax({
			type: "POST",
			url: mypacco_script_array.mypacco_Orders_cancel_url,
			dataType : "json",
			data: orderid,
			beforeSend: function () {
                jQuery('#data_loading').show();
            },
			success: function (data) {
				//alert(data);
				jQuery('#data_loading').hide(); 
				bootbox.alert('Order has been Cancel successfully.');
				setTimeout(function () {
				top.location.replace(mypacco_script_array.mypacco_order_redirect_url);
				}, 2000);
			}
		});

		return false;
	}