var isEditMode = false;
var selectDomainSeq;
var selectLtoSeq;
var selectStoSeq;

var editModalTarget;
var isEditModalAdd = true;
var editSeq;

var removeSeq;
var removeTarget;

var disabledStr = '';
var authArray = ['master', 'level1', 'level2', 'level3'];

$(document).ready(function() {
	
	if(!authArray.includes(_authCd)){
		disabledStr = 'disabled';
	}
	
	$(".collapse").hide();
	
	$("#editModeChangeBtn").on("click", function() {
		isEditMode = !isEditMode;
		
		if(isEditMode){
			$(".newBtnArea").show();
			$(".orderBtnArea").hide();
			$(".editBtnArea").show();
		} else {
			$(".newBtnArea").hide();
			$(".orderBtnArea").show();
			$(".editBtnArea").hide();
		}
		
		fn_itemStatusCollapse();
	});
	
	$(".saveInfoBtn").on("click", function() {
		if(!isEditModalAdd){
			if(editModalTarget === "dto") {
				if($("#modifyDomainName").val() === ''){
					fn_alert("영역 이름을 작성해주세요.", "danger");
					$("#modifyDomainName").focus();
					return;
				}
			} else if(editModalTarget === "lto") {
				if($("#modifyLtoName").val() === ''){
					fn_alert("장기목표 이름을 작성해주세요.", "danger");
					$("#modifyLtoName").focus();
					return;
				}
			} else {
				if($("#modifyStoName").val() === ''){
					fn_alert("단기목표 이름을 작성해주세요.", "danger");
					$("#modifyStoName").focus();
					return;
				}
			}
		} else {
			if(editModalTarget === "dto") {
				if($("input[name=domainName]").length < 1){
					fn_alert("등록 할 영역을 추가해주세요.", "danger");
					return;
				}
			} else if(editModalTarget === "lto") {
				if($("input[name=ltoName]").length < 1){
					fn_alert("등록 할 장기목표를 추가해주세요.", "danger");
					return;
				}
			} else {
				if($("input[name=stoName]").length < 1){
					fn_alert("등록 할 단기목표를 추가해주세요.", "danger");
					return;
				}
			}
		}
		
		fn_saveItemData();
	});
	
	$("#domainAddBtn").on("click", function() {
		editModalTarget = "dto";
		isEditModalAdd = true;
		
		$(".domainItem").remove();
		$("#addDomainName").val("");
		$("#domainEditModal").modal("show");
		fn_checkItemEmpty("domainName");
	});

	$("#ltoAddBtn").on("click", function() {
		if(!selectDomainSeq){
			fn_alert("영역을 선택하세요.", "warning");
			return;
		}
		editModalTarget = "lto";
		isEditModalAdd = true;
		
		$(".ltoItem").remove();
		$("#addLtoName").val("");
		$("#ltoEditModal").modal("show");
		fn_checkItemEmpty("ltoName");
	});
	
	$("#stoAddBtn").on("click", function() {
		if(!selectLtoSeq){
			fn_alert("장기목표를 선택하세요.", "warning");
			return;
		}
		editModalTarget = "sto";
		isEditModalAdd = true;
		
		$("#stoTrialCnt").val("15");
		$("#stoArrStdPst").val("90");
		$("#stoUrgContents").val("");
		$("#stoRnfcContents").val("");
		$("#stoMemoContents").val("");
		
		$(".stoItem").remove();
		$("#addStoName").val("");
		$("#stoEditModal").modal("show");
		fn_checkItemEmpty("stoName");
	});
	
	$("#domainListAddBtn").on("click", function() {
		var domainName = $("#addDomainName").val();
		var tmpDomainSeq = 0;
		
		if($("#domainTmpSelectChk").is(":checked") && !$("#addDomainNameSelect > option").eq(0).is(":checked") ){
			domainName = $("#addDomainNameSelect > option:checked").text();
			tmpDomainSeq = $("#addDomainNameSelect > option:checked").val();
		}
		
		var html = ''; 
		
		html += '	<div class="input-group mb-2 domainItem">';
		html += '		<input type="text" class="form-control" name="domainName" value="'+domainName+'" data-value="'+tmpDomainSeq+'" disabled>';
		html += '		<button class="btn btn-outline-secondary" type="button" onclick="fn_itemRemove(this)">';
		html += '			<i class="bi bi-x-lg"></i>';
		html += '		</button>';
		html += '	</div>';
		
		if(domainName) {
			$("#domainList").append(html);
			$("#addDomainName").val("");
			$("#addDomainNameSelect").val("");
		}
		
		fn_checkItemEmpty("domainName");
	});
	
	$("#ltoListAddBtn").on("click", function() {
		var ltoName = $("#addLtoName").val();
		var tmpLtoSeq = 0;
		
		if($("#ltoTmpSelectChk").is(":checked") && !$("#addLtoNameSelect > option").eq(0).is(":checked") ){
			ltoName = $("#addLtoNameSelect > option:checked").text();
			tmpLtoSeq = $("#addLtoNameSelect > option:checked").val();
		}
		
		var html = ''; 
		
		html += '	<div class="input-group mb-2 ltoItem">';
		html += '		<input type="text" class="form-control" name="ltoName" value="'+ltoName+'" data-value="'+tmpLtoSeq+'" disabled>';
		html += '		<button class="btn btn-outline-secondary" type="button" onclick="fn_itemRemove(this)">';
		html += '			<i class="bi bi-x-lg"></i>';
		html += '		</button>';
		html += '	</div>';
		
		if(ltoName) {
			$("#ltoList").append(html);
			$("#addLtoName").val("");
			$("#addLtoNameSelect").val("");
		}
		
		fn_checkItemEmpty("ltoName");
	});
	
	$("#stoListAddBtn").on("click", function() {
		var stoName = $("#addStoName").val();
		var tmpStoSeq = 0;
		
		if($("#stoTmpSelectChk").is(":checked") && !$("#addStoNameSelect > option").eq(0).is(":checked") ){
			stoName = $("#addStoNameSelect > option:checked").text();
			tmpStoSeq = $("#addStoNameSelect > option:checked").val();
		}
		
		var html = ''; 
		
		html += '	<div class="input-group mb-2 stoItem">';
		html += '		<input type="text" class="form-control" name="stoName" value="'+stoName+'" data-value="'+tmpStoSeq+'" disabled>';
		html += '		<button class="btn btn-outline-secondary" type="button" onclick="fn_itemRemove(this)">';
		html += '			<i class="bi bi-x-lg"></i>';
		html += '		</button>';
		html += '	</div>';
		
		if(stoName) {
			$("#stoList").append(html);
			$("#addStoName").val("");
			$("#addStoNameSelect").val("");
		}
		
		fn_checkItemEmpty("stoName");
	});
	
	$(".modal").on("shown.bs.modal", function() {
		$(".form-switch .form-check-input").prop("checked", false).trigger("change");
		if(isEditModalAdd){
			$(".modalAddArea").show();
			$(".modalModifyArea").hide();
		} else {
			$(".modalAddArea").hide();
			$(".modalModifyArea").show();
		}
	});
	
	$("#domainTmpSelectChk").on("change", function() {
		$("#addDomainName").val("");
		fn_setTmpDomainSelectbox();
		
		var checked = $(this).is(":checked");
		$("#addDomainName").css("display", checked ? "none" : "block");
		$("#addDomainNameSelect").css("display", checked ? "block" : "none");
		
	});
	
	$("#ltoTmpSelectChk").on("change", function() {
		$("#addLtoName").val("");
		fn_setTmpLtoSelectbox();
		
		var checked = $(this).is(":checked");
		$("#addLtoName").css("display", checked ? "none" : "block");
		$("#addLtoNameSelect").css("display", checked ? "block" : "none");
		
	});
	
	$("#stoTmpSelectChk").on("change", function() {
		$("#addStoName").val("");
		fn_setTmpStoSelectbox();
		
		var checked = $(this).is(":checked");
		$("#addStoName").css("display", checked ? "none" : "block");
		$("#addStoNameSelect").css("display", checked ? "block" : "none");
		
	});
	
	//그래프 버튼
	$("#openGraphBtn").on('click', function() {
		
		if(!selectStoSeq) {
			fn_alert("선택된 단기목표가 없습니다.", "warning");
			return;
		}
		
		var stoSeq = selectStoSeq;
		
		$("#positiveReactionChk").prop("checked", true);
		$("#urgingChk").prop("checked", true);
		
		$.selectLtoChartData(stoSeq);
		$("#stoGraphModal").modal("show");
	});
	
	$.init = function() {
		fn_makeDomainList();
	};
	
	$.init();
});

function fn_setTmpDomainSelectbox() {
	var param = {
			childrenSeq : _childrenInfo.childrenSeq,
			centerSeq : sessionStorage.getItem("centerSeq")
	};
	
	$.ajax({
		url: "/cpm/ajax.selectTmpDomainSelectbox"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			$("#addDomainNameSelect").empty();
			var html = '<option value="" selected="">추가할 영역을 선택하세요.</option>';
			data.tmpDomainList.forEach(function(item, index, array) {
				html += '<option value="'+item.domainSeq+'">'+item.domainName+'</option>';
			});
			$("#addDomainNameSelect").html(html);
		}
		, error : function(request, status, error) {
			fn_alert("영역정보 조회에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function fn_setTmpLtoSelectbox() {
	var param = {
			domainSeq : selectDomainSeq
	};
	
	$.ajax({
		url: "/cpm/ajax.selectTmpLtoSelectbox"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			$("#addLtoNameSelect").empty();
			var html = '<option value="" selected="">추가할 장기목표를 선택하세요.</option>';
			data.tmpLtoList.forEach(function(item, index, array) {
				html += '<option value="'+item.ltoSeq+'">'+item.ltoName+'</option>';
			});
			$("#addLtoNameSelect").html(html);
		}
		, error : function(request, status, error) {
			fn_alert("장기목표 조회에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function fn_setTmpStoSelectbox() {
	var param = {
			ltoSeq : selectLtoSeq
	};
	
	$.ajax({
		url: "/cpm/ajax.selectTmpStoSelectbox"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			$("#addStoNameSelect").empty();
			var html = '<option value="" selected="">추가할 단기목표를 선택하세요.</option>';
			data.tmpStoList.forEach(function(item, index, array) {
				html += '<option value="'+item.stoSeq+'">'+item.stoName+'</option>'
			});
			$("#addStoNameSelect").html(html);
		}
		, error : function(request, status, error) {
			fn_alert("단기목표 조회에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function fn_saveItemData() {
	var url = fn_getEditUrl();
	var param = fn_getEditParam();
	
	$.ajax({
		url: url
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			$(".modal").modal("hide");
			
			if(editModalTarget === "dto") {
				fn_makeDomainList();
			} else if(editModalTarget === "lto") {
				fn_makeLtoList();
			} else if(editModalTarget === "sto") {
				fn_makeStoList();
			}
		}
		, error : function(request, status, error) {
			fn_alert("저장에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function fn_getEditParam() {
	var param = {};
	if(editModalTarget === "dto") {
		var domainName = "";
		var domainTmpSeq = "";
		if(isEditModalAdd) {
			$("input[name=domainName]").each(function(index, element) {
				domainName += $(this).val();
				domainTmpSeq += $(this).data("value");
				if(index < $("input[name=domainName]").length - 1){
					domainName += "||";
					domainTmpSeq += "||";
				}
			});
			param.domainTmpSeqList = domainTmpSeq;
		} else {
			domainName = $("#modifyDomainName").val();
			param.domainSeq = editSeq;
		}
		param.childrenSeq = _childrenInfo.childrenSeq;
		param.domainName = domainName;
		param.domainContents = '';
		
	} else if(editModalTarget === "lto") {
		var ltoName = "";
		var ltoTmpSeq = "";
		if(isEditModalAdd) {
			$("input[name=ltoName]").each(function(index, element) {
				ltoName += $(this).val();
				ltoTmpSeq += $(this).data("value");
				if(index < $("input[name=ltoName]").length - 1){
					ltoName += "||";
					ltoTmpSeq += "||";
				}
			});
			param.ltoTmpSeqList = ltoTmpSeq;
		} else {
			ltoName = $("#modifyLtoName").val();
			param.ltoSeq = editSeq;
		}
		param.domainSeq = selectDomainSeq;
		param.ltoName = ltoName;
		param.ltoContents = '';
	} else {
		var stoName = "";
//		var stoTmpSeq = "";
		if(isEditModalAdd) {
			$("input[name=stoName]").each(function(index, element) {
				stoName += $(this).val();
				if(index < $("input[name=stoName]").length - 1){
					stoName += ", ";
				}
			});
			param.stoTmpSeqList = 0;
		} else {
			stoName = $("#modifyStoName").val();
			param.stoSeq = editSeq;
		}
		param.ltoSeq = selectLtoSeq;
		param.stoName = stoName;
		param.stoContents = '';
		param.stoTrialCnt = $("#stoTrialCnt").val();
		param.stoArrStdPst = $("#stoArrStdPst").val();
		param.stoUrgContents = $("#stoUrgContents").val();
		param.stoRnfcContents = $("#stoRnfcContents").val();
		param.stoMemoContents = $("#stoMemoContents").val();
	}
	
	return param;
}

function fn_getEditUrl() {
	var url = '/cpm/ajax.';
	
	if(isEditModalAdd) {
		url += 'insert';
	} else {
		url += 'update';
	}
	
	if(editModalTarget === "dto") {
		url += "Domain";
	} else if(editModalTarget === "lto") {
		url += "Lto";
	} else {
		url += "Sto";
	}
	
	return url;
}

function fn_itemRemove(obj) {
	var name = $(obj).parent().children("input").attr("name");
	$(obj).parent().remove();
	fn_checkItemEmpty(name);
}

function fn_checkItemEmpty(name) {
	if($("input[name="+name+"]").length > 0) {
		$(".emptyContents").hide();
	} else {
		$(".emptyContents").show();
	}
}

function fn_setSelectSeq() {
	selectDomainSeq = $(".dto-item.active").data("seq");
	selectLtoSeq = $(".lto-item.active").data("seq");
	selectStoSeq = $(".sto-item.active").data("seq");
	
	$("#dtoLabel").text($(".dto-item.active > span:eq(0)").text());
	$("#ltoLabel").text($(".lto-item.active > span:eq(0)").text());
	$("#stoLabel").text($(".sto-item.active > span:eq(0)").text());
	
	$("#ltoLabel").text() !== "" ? $("#ltoLabel").show() : $("#ltoLabel").hide();
	$("#stoLabel").text() !== "" ? $("#stoLabel").show() : $("#stoLabel").hide();

	fn_setStoDatailArea();
}

/* *********************************
 * 도메인 조작
 ********************************* */
function fn_makeDomainList() {
	var domainList = fn_selectDomain();
	var html = '';
	
	domainList.forEach(function(item, index, array) {
		html += '<div>';
		html += '	<li class="list-group-item dto-item '+getItemStatusStyle(item.domainStatusCd)+'" data-seq="'+item.domainSeq+'" data-order="'+item.domainSortOrder+'" >';
		html += '		<span>'+item.domainName+'</span>';
		html += '		<div class="orderBtnArea" '+(!isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order '+disabledStr+'" data-type="up" data-target="dto" '+disabledStr+'>';
		html += '				<i class="bi bi-caret-up-fill"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order '+disabledStr+'" data-type="down" data-target="dto" '+disabledStr+'>';
		html += '				<i class="bi bi-caret-down-fill"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '		<div class="editBtnArea" '+(isEditMode ? '' : 'style="display: none;"')+'>'; 
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm editBtn '+disabledStr+'" data-target="dto" '+disabledStr+'>';
		html += '				<i class="bi bi-pencil-square"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm removeBtn '+disabledStr+'" data-target="dto" '+disabledStr+'>';
		html += '				<i class="bi bi-trash"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '	</li>';
		if(disabledStr !== 'disabled'){
			html += '	<div id="domainCollapse'+item.domainSeq+'" class="accordion-collapse collapse" data-bs-parent="#domainListArea">';
			html += '		<div class="accordion-body">';
			html += '			<div class="btn-group btn-group-sm status-btn-group" data-target="dto" role="group" aria-label="Small button group">';
			html += '				<button type="button" data-value="ING" class="status-btn btn btn-outline-secondary '+(item.domainStatusCd == 'ING' ? 'active' : '')+'">진행</button>';
			html += '				<button type="button" data-value="CMP" class="status-btn btn btn-outline-secondary '+(item.domainStatusCd == 'CMP' ? 'active' : '')+'">도달</button>';
			html += '				<button type="button" data-value="RPT" class="status-btn btn btn-outline-secondary '+(item.domainStatusCd == 'RPT' ? 'active' : '')+'">레파토리</button>';
			html += '				<button type="button" data-value="STP" class="status-btn btn btn-outline-secondary '+(item.domainStatusCd == 'STP' ? 'active' : '')+'">중단</button>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
		}
		html += '</div>';
	});

	$("#stoListArea").empty();
	$("#ltoListArea").empty();
	$("#domainListArea").empty();
	$("#domainListArea").append(html);
	fn_renderDomainItemEvent();
	
	fn_setSelectSeq();
}

function fn_renderDomainItemEvent() {
	$(".dto-item").on('click', function (e) {
		if(!$(e.target).hasClass("bi")){
			$(".dto-item").removeClass('active');
			$(this).addClass('active');
			
			fn_setSelectSeq();
			fn_itemStatusCollapse();
			//lto 리스트 생성
			fn_makeLtoList();
//			
//			$.selectLtoChartData(selectStoSeq);
		}
	});
}

function fn_selectDomain(domainSeq) {
	
	var returnData = null;
	var param = {
			childrenSeq : _childrenInfo.childrenSeq
	};
	
	if(domainSeq) {
		param.domainSeq = domainSeq;
	}
	
	$.ajax({
		url: "/cpm/ajax.selectDomain"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			returnData = data.domainList;
		}
		, error : function(request, status, error) {
			fn_alert("영역 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
	
	return returnData;
}

/* *********************************
 * LTO 조작
 ********************************* */
function fn_makeLtoList() {
	var ltoList = fn_selectLto();
	var html = '';
	
	ltoList.forEach(function(item, index, array) {
		html += '<div>';
		html += '	<li class="list-group-item lto-item '+getItemStatusStyle(item.ltoStatusCd)+'" data-seq="'+item.ltoSeq+'" data-order="'+item.ltoSortOrder+'">';
		html += '		<span>'+item.ltoName+'</span>';
		html += '		<div class="orderBtnArea" '+(!isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order '+disabledStr+'" data-type="up" data-target="lto" '+disabledStr+'>';
		html += '				<i class="bi bi-caret-up-fill"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order '+disabledStr+'" data-type="down" data-target="lto" '+disabledStr+'>';
		html += '				<i class="bi bi-caret-down-fill"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '		<div class="editBtnArea" '+(isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm editBtn '+disabledStr+'" data-target="lto" '+disabledStr+'>';
		html += '				<i class="bi bi-pencil-square"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm removeBtn '+disabledStr+'" data-target="lto" '+disabledStr+'>';
		html += '				<i class="bi bi-trash"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '	</li>';
		if(disabledStr !== 'disabled'){
			html += '	<div id="ltoCollapse'+item.ltoSeq+'" class="accordion-collapse collapse" data-bs-parent="#ltoListArea">';
			html += '		<div class="accordion-body">';
			html += '			<div class="btn-group btn-group-sm status-btn-group" data-target="lto" role="group" aria-label="Small button group">';
			html += '				<button type="button" data-value="ING" class="status-btn btn btn-outline-secondary '+(item.ltoStatusCd == 'ING' ? 'active' : '')+'">진행</button>';
			html += '				<button type="button" data-value="CMP" class="status-btn btn btn-outline-secondary '+(item.ltoStatusCd == 'CMP' ? 'active' : '')+'">도달</button>';
			html += '				<button type="button" data-value="RPT" class="status-btn btn btn-outline-secondary '+(item.ltoStatusCd == 'RPT' ? 'active' : '')+'">레파토리</button>';
			html += '				<button type="button" data-value="STP" class="status-btn btn btn-outline-secondary '+(item.ltoStatusCd == 'STP' ? 'active' : '')+'">중단</button>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
		}
		html += '</div>';
	});
	$("#stoListArea").empty();
	$("#ltoListArea").empty();
	$("#ltoListArea").append(html);
	fn_renderLtoItemEvent();
	
	fn_setSelectSeq();
}

function fn_renderLtoItemEvent() {
	$(".lto-item").on('click', function (e) {
		if(!$(e.target).hasClass("bi")){
			$(".lto-item").removeClass('active');
			$(this).addClass('active');
			$("#stoListArea").empty();
			
			fn_setSelectSeq();
			fn_itemStatusCollapse();
			//sto 리스트 생성
			fn_makeStoList();
//			
//			$.selectLtoChartData(selectStoSeq);
		}
	});
}

function fn_selectLto(ltoSeq) {
	
	var returnData = null;
	var param = {
		domainSeq : selectDomainSeq
	};
	
	if(ltoSeq) {
		param.ltoSeq = ltoSeq;
	}
	
	$.ajax({
		url: "/cpm/ajax.selectLto"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			returnData = data.ltoList;
		}
		, error : function(request, status, error) {
			fn_alert("장기목표 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
	
	return returnData;
}

/* *********************************
 * STO 조작
 ********************************* */
function fn_makeStoList() {
	var stoList = fn_selectSto();
	var html = '';
	
	stoList.forEach(function(item, index, array) {
		html += '<div>';
		html += '	<li class="list-group-item sto-item '+getItemStatusStyle(item.stoStatusCd)+'" data-seq="'+item.stoSeq+'" data-order="'+item.stoSortOrder+'">';
		html += '		<span>'+item.stoName+'</span>';
		html += '		<div class="orderBtnArea" '+(!isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order '+disabledStr+'" data-type="up" data-target="sto" '+disabledStr+'>';
		html += '				<i class="bi bi-caret-up-fill"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order '+disabledStr+'" data-type="down" data-target="sto" '+disabledStr+'>';
		html += '				<i class="bi bi-caret-down-fill"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '		<div class="editBtnArea" '+(isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm editBtn '+disabledStr+'" data-target="sto" '+disabledStr+'>';
		html += '				<i class="bi bi-pencil-square"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm removeBtn '+disabledStr+'" data-target="sto" '+disabledStr+'>';
		html += '				<i class="bi bi-trash"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '	</li>';
		if(disabledStr !== 'disabled'){
			html += '	<div id="stoCollapse'+item.stoSeq+'" class="accordion-collapse collapse" data-bs-parent="#stoListArea">';
			html += '		<div class="accordion-body">';
			html += '			<div class="btn-group btn-group-sm status-btn-group" data-target="sto" role="group" aria-label="Small button group">';
			html += '				<button type="button" data-value="ING" class="status-btn btn btn-outline-secondary '+(item.stoStatusCd == 'ING' ? 'active' : '')+'">진행</button>';
			html += '				<button type="button" data-value="CMP" class="status-btn btn btn-outline-secondary '+(item.stoStatusCd == 'CMP' ? 'active' : '')+'">도달</button>';
			html += '				<button type="button" data-value="RPT" class="status-btn btn btn-outline-secondary '+(item.stoStatusCd == 'RPT' ? 'active' : '')+'">레파토리</button>';
			html += '				<button type="button" data-value="STP" class="status-btn btn btn-outline-secondary '+(item.stoStatusCd == 'STP' ? 'active' : '')+'">중단</button>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
		}
		html += '</div>';
	});
	
	$("#stoListArea").empty();
	$("#stoListArea").append(html);
	fn_renderStoItemEvent();
	
	fn_setSelectSeq();
}

function fn_renderStoItemEvent() {
	$(".sto-item").on('click', function (e) {
		if(!$(e.target).hasClass("bi")){
			$(".sto-item").removeClass('active');
			$(this).addClass('active');
			
			fn_setSelectSeq();
			fn_itemStatusCollapse();
			
			$.selectLtoChartData(selectStoSeq);
		}
	});
}

function fn_selectSto(stoSeq) {
	
	var returnData = null;
	var param = {
		ltoSeq : selectLtoSeq
	};
	
	if(stoSeq) {
		param.stoSeq = stoSeq;
	}
	
	$.ajax({
		url: "/cpm/ajax.selectSto"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			returnData = data.stoList;
		}
		, error : function(request, status, error) {
			fn_alert("영역 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
	
	return returnData;
}

function fn_setStoDatailArea() {
	
	if(selectStoSeq){
		var stoDetail = fn_selectSto(selectStoSeq)[0];
		
		$("#detailStoStatusCd").html(getStatusBadge(stoDetail.stoStatusCd));
		$("#detailStoName").text(stoDetail.stoName);
		$("#detailStoTrialCnt").text(stoDetail.stoTrialCnt);
		$("#detailStoArrStdPst").text(stoDetail.stoArrStdPst + " %");
		$("#detailStoUrgContents").text(stoDetail.stoUrgContents);
		$("#detailStoRnfcContents").text(stoDetail.stoRnfcContents);
		$("#detailStoMemoContents").text(stoDetail.stoMemoContents);
	} else {
		$("#detailStoStatusCd").html("");
		$("#detailStoName").text("");
		$("#detailStoTrialCnt").text("");
		$("#detailStoArrStdPst").text("");
		$("#detailStoUrgContents").text("");
		$("#detailStoRnfcContents").text("");
		$("#detailStoMemoContents").text("");
	}
}

function getStatusBadge(statusCd) {
	var html = '';
	switch (statusCd) {
	case "ING":
		html = '<h5 class="sto-detail-status"><span class="badge text-bg-success">진행 중</span></h5>';
		break;
	case "CMP":
		html = '<h5 class="sto-detail-status"><span class="badge text-bg-danger">준거 도달</span></h5>';
		break;
	case "RPT":
		html = '<h5 class="sto-detail-status"><span class="badge text-bg-warning">레파토리</span></h5>';
		break;
	case "STP":
		html = '<h5 class="sto-detail-status"><span class="badge text-bg-primary">중단</span></h5>';
		break;
	default:
		html = '<h5 class="sto-detail-status"><span class="badge text-bg-light">대기 중</span></h5>';
		break;
	}
	return html;
}

function getItemStatusStyle(statusCd) {
	var html = '';
	switch (statusCd) {
	case "ING":
		html = 'list-status-ing';
		break;
	case "CMP":
		html = 'list-status-cmp';
		break;
	case "RPT":
		html = 'list-status-rpt';
		break;
	case "STP":
		html = 'list-status-stp';
		break;
	default:
		html = 'list-status-wit';
	break;
	}
	return html;
}

/* *********************************
 * edit 버튼 조작
 ********************************* */
function fn_onclickOrderBtn(targetArea, targerOrder, upDown) {
	
	var targetIndex = Number(targerOrder)-1;
	var beforeIndex = Number(targetIndex)-1;
	var afterIndex = Number(targetIndex)+1;
	
	var beforeOrder = Number(targerOrder)-1;
	var afterOrder = Number(targerOrder)+1;
	
	if(upDown === "up"){
		$("."+targetArea+"-item:eq("+targetIndex+")").attr("data-order", beforeOrder);
		$("."+targetArea+"-item:eq("+beforeIndex+")").attr("data-order", targerOrder);
		$("."+targetArea+"-item:eq("+targetIndex+")").parent("div").insertBefore($("."+targetArea+"-item:eq("+beforeIndex+")").parent("div"));
	} else {
		$("."+targetArea+"-item:eq("+targetIndex+")").attr("data-order", afterOrder);
		$("."+targetArea+"-item:eq("+afterIndex+")").attr("data-order", targerOrder);
		$("."+targetArea+"-item:eq("+targetIndex+")").parent("div").insertAfter($("."+targetArea+"-item:eq("+afterIndex+")").parent("div"));
	}
	
}

function fn_updateSortOrder(targetArea, seq, order, updown) {
	var oldSortOrder = Number(order);
	var newSortOrder = (updown==="up" ? Number(order)-1 : Number(order)+1);
	
	var param = {
		target : targetArea,
		seq : seq,
		oldSortOrder : oldSortOrder,
		newSortOrder : newSortOrder
	};
	
	$.ajax({
		url: "/cpm/ajax.updateSortOrder"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
		}
		, error : function(request, status, error) {
			fn_alert("정렬 순서가 업데이트 되지 않았습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

$(document).on("click", ".order", function() {
	var targetArea = $(this).data("target");
	var targetOrder = $(this).parent().parent().attr("data-order");
	var upDown = $(this).data("type");
	var seq = $(this).parent().parent().data("seq");
	
	var last = Number($("."+targetArea+"-item").last().attr("data-order"));
	
	if( (Number(targetOrder) === 1 && upDown === "up") 
		|| (Number(targetOrder) === last && upDown === "down") ){
		return;
	}
	
	fn_onclickOrderBtn(targetArea, targetOrder, upDown);
	
	fn_updateSortOrder(targetArea, seq, targetOrder, upDown);
	
});

$(document).on("click", ".removeBtn", function() {
	removeSeq = $(this).parent().parent().data("seq");
	removeTarget = $(this).data("target");
	
	fn_confirm("정말 삭제하시겠습니까?", fn_deleteProgram, "danger")
});

$(document).on("click", ".editBtn", function() {
	
	$(this).parent().parent().trigger("click");
	
	editSeq = $(this).parent().parent().data("seq");
	editModalTarget = $(this).data("target");
	isEditModalAdd = false;
	
	if(editModalTarget === "dto") {
		$("#modifyDomainName").val($(this).parent().parent().children("span:eq(0)").text());
		$("#domainEditModal").modal("show");
		
	} else if (editModalTarget === "lto") {
		$("#modifyLtoName").val($(this).parent().parent().children("span:eq(0)").text());
		$("#ltoEditModal").modal("show");
		
	} else {
		var stoDetail = fn_selectSto(selectStoSeq)[0];
		$("#modifyStoName").val(stoDetail.stoName);
		$("#stoTrialCnt").val(stoDetail.stoTrialCnt);
		$("#stoArrStdPst").val(stoDetail.stoArrStdPst);
		$("#stoUrgContents").val(stoDetail.stoUrgContents);
		$("#stoRnfcContents").val(stoDetail.stoRnfcContents);
		$("#stoMemoContents").val(stoDetail.stoMemoContents);
		
		$("#stoEditModal").modal("show");
		
	}
});

function fn_deleteProgram() {
	var param = {
		target : removeTarget,
		seq : removeSeq,
		domainSeq : selectDomainSeq,
		ltoSeq : selectLtoSeq,
		stoSeq : selectStoSeq,
		childrenSeq : _childrenInfo.childrenSeq
	};
	
	$.ajax({
		url: "/cpm/ajax.deleteProgram"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			if(removeTarget === "dto") {
				fn_makeDomainList();
			} else if(removeTarget === "lto") {
				fn_makeLtoList();
			} else if(removeTarget === "sto") {
				fn_makeStoList();
			}
			
			removeSeq = null;
			removeTarget = null;
		}
		, error : function(request, status, error) {
			fn_alert("해당 프로그램을 삭제하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function fn_itemStatusCollapse() {
	if(isEditMode) {
		$("#domainCollapse"+selectDomainSeq).collapse("show");
		$("#ltoCollapse"+selectLtoSeq).collapse("show");
		$("#stoCollapse"+selectStoSeq).collapse("show");
	} else {
		$(".accordion-collapse").collapse("hide");
	}
}

$(document).on("click", ".status-btn", function() {
	var targetEle = $(this).parent(".btn-group");
	var targetType = $(targetEle).data("target");
	var statusCd = $(this).data("value");
	
	if(!$(this).hasClass("active")){
		$(targetEle).children(".status-btn").removeClass("active");
		$(this).addClass("active");
		
		fn_updateStatus(targetType, statusCd);
		
	}
});


function fn_updateStatus(targetType, statusCd) {
	var url = "/cpm/ajax.updateStatusCd";
	var param = {
			target : targetType,
			domainSeq : selectDomainSeq,
			ltoSeq : selectLtoSeq,
			stoSeq : selectStoSeq,
			statusCd : statusCd
	};
	
	$.ajax({
		url: url
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : true
		, success : function(data) {
			fn_renderStatus();
		}
		, error : function(request, status, error) {
			fn_alert("저장에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function fn_renderStatus() {
	var url = "/cpm/ajax.selectProgramStatusCd";
	var param = {
			domainSeq : selectDomainSeq,
			ltoSeq : selectLtoSeq,
			stoSeq : selectStoSeq
	};
	
	$.ajax({
		url: url
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : true
		, success : function(data) {
			$("#domainListArea .accordion-collapse.show").find("button").removeClass("active");
			$("#domainListArea .accordion-collapse.show").find("button[data-value="+data.result.domainStatusCd+"]").addClass("active");
		
			$("#domainListArea li.active").removeClass("list-status-wit list-status-ing list-status-cmp list-status-rpt list-status-stp");
			$("#domainListArea li.active").addClass("list-status-"+data.result.domainStatusCd.toLowerCase());
			
			$("#ltoListArea .accordion-collapse.show").find("button").removeClass("active");
			$("#ltoListArea .accordion-collapse.show").find("button[data-value="+data.result.ltoStatusCd+"]").addClass("active");
			
			if(selectLtoSeq){
				$("#ltoListArea li.active").removeClass("list-status-wit list-status-ing list-status-cmp list-status-rpt list-status-stp");
				$("#ltoListArea li.active").addClass("list-status-"+data.result.ltoStatusCd.toLowerCase());
			}
			
			$("#stoListArea .accordion-collapse.show").find("button").removeClass("active");
			$("#stoListArea .accordion-collapse.show").find("button[data-value="+data.result.stoStatusCd+"]").addClass("active");
			
			if(selectStoSeq){
				$("#stoListArea li.active").removeClass("list-status-wit list-status-ing list-status-cmp list-status-rpt list-status-stp");
				$("#stoListArea li.active").addClass("list-status-"+data.result.stoStatusCd.toLowerCase());
			
				$("#detailStoStatusCd").html(getStatusBadge(data.result.stoStatusCd));
			}
		}
		, error : function(request, status, error) {
		}
	});
}
