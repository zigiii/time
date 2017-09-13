package com.alice.time.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alice.time.bean.Time;
import com.alice.time.common.ResponseResult;
import com.alice.time.service.TimeService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value="/time")
public class TimeController {
	
	@Autowired
	TimeService timeService;

	@RequestMapping(value="/queryAll",method=RequestMethod.GET)
	@ApiOperation(value="查询所有目标",notes="详细说明")
	public List<Time> queryAll(){
		return timeService.queryAll();
	}
	
	@RequestMapping(value="/queryMostImportantTime",method=RequestMethod.GET)
	@ApiOperation(value="查询最重要时间",notes="")
	public ResponseResult queryMostImportantTime(){
		return timeService.queryMostImportantTime();
	}
	
	@RequestMapping(value="/queryPagingTime/{pageNum}",method=RequestMethod.GET)
	@ApiOperation(value="查询最重要时间",notes="")
	public ResponseResult queryPagingTime(@ApiParam(name="pageNum",value="页数",required = true) @PathVariable int pageNum){
		return timeService.queryPagingTime(pageNum);
	}
	
	@RequestMapping(value="/deferTime",method=RequestMethod.POST)
	@ApiOperation(value="延期",notes="")
	public ResponseResult deferTime(@RequestBody Time timeTarget){
		return timeService.deferTime(timeTarget);
	}
	
	@RequestMapping(value="/changeOverStatus",method=RequestMethod.POST)
	@ApiOperation(value="转换结束时间状态",notes="")
	public ResponseResult changeOverStatus(@RequestBody Time timeTarget){
		return timeService.changeOverStatus(timeTarget);
	}
}
