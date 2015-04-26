-module(monad_tests).

-compile(export_all).

-import(monad_transform, [transform_node/3, transform_nodes/2, transform_function/2]).
-import(monad_transform, [parse_transform/2]).

%%  return({A,B}) == parser:return({A,B})
transform_return_test() ->
  Return = {call,11,{atom,11,return},[{tuple,11,[{var,11,'A'},{var,11,'B'}]}]},
  Transformed = [{call,11,
                      {remote,11,{atom,11,parser},{atom,11,return}},
                      [{tuple,11,[{var,11,'A'},{var,11,'B'}]}]}],
  Transformed = transform_node(Return, nil, parser),
  ok.

%% A = char($a) == parser:bind(char($a), fun (A) -> ... end)
transform_bind_test() ->
  Match = {match,9,{var,9,'A'},{call,9,{atom,9,char},[{char,9,98}]}},
  Transformed = [{call,9,
                  {remote,9,{atom,9,parser},{atom,9,bind}},
                  [{call,9,{atom,9,char},[{char,9,98}]},
                   {'fun',9,
                    {clauses,
                     [{clause,9,
                       [{var,9,'A'}],
                       [],
                       [{atom,9,ok}]}]}}]}],
  Continuation = [{atom,9,ok}],
  case transform_node(Match, Continuation, parser) of
    Transformed -> ok;
    Trans ->
      io:format("~p~n", [Transformed]),
      io:format("~p~n", [Trans]),
      failed
  end.

%% A = char($a),
%% return({A,B})
%%
%% must become...
%%
%% parser:bind(char($a), fun (A)
%%   parser:return({A,B})
%% end)
transform_bind_and_return_test() ->
  Input = [{match,10,{var,10,'B'},{call,10,{atom,10,char},[{char,10,98}]}},
           {call,11,{atom,11,return},[{tuple,11,[{var,11,'A'},{var,11,'B'}]}]}],
  Expected = [{call,10,
               {remote,10,{atom,10,parser},{atom,10,bind}},
               [{call,10,{atom,10,char},[{char,10,98}]},
                {'fun',10,
                 {clauses,
                  [{clause,10,
                    [{var,10,'B'}],
                    [],
                    [{call,11,
                      {remote,11,{atom,11,parser},{atom,11,return}},
                      [{tuple,11,[{var,11,'A'},{var,11,'B'}]}]}]}]}}]}],
  case transform_nodes(Input, parser) of
    Expected -> ok;
    Failed   ->
      io:format("~p~n", [Expected]),
      io:format("~p~n", [Failed]),
      failed
  end.

%% see monads.erl for an example of the transformation
transform_function_test() ->
  Input = {function,8,expr,0,
            [{clause,8,[],[],
              [{match,9,{var,9,'A'},{call,9,{atom,9,char},[{char,9,97}]}},
               {match,10,{var,10,'B'},{call,10,{atom,10,char},[{char,10,98}]}},
               {call,11,{atom,11,return},[{tuple,11,[{var,11,'A'},{var,11,'B'}]}]}]}]},
  Expected = {function,8,expr,0,
              [{clause,8,[],[],
                [{call,9,
                  {remote,9,{atom,9,parser},{atom,9,bind}},
                  [{call,9,{atom,9,char},[{char,9,97}]},
                   {'fun',9,
                    {clauses,
                     [{clause,9,
                       [{var,9,'A'}],
                       [],
                       [{call,10,
                         {remote,10,{atom,10,parser},{atom,10,bind}},
                         [{call,10,{atom,10,char},[{char,10,98}]},
                          {'fun',10,
                           {clauses,
                            [{clause,10,
                              [{var,10,'B'}],
                              [],
                              [{call,11,
                                {remote,11,{atom,11,parser},{atom,11,return}},
                                [{tuple,11,[{var,11,'A'},{var,11,'B'}]}]}]}]}}]}]}]}}]}]}]},
  case transform_function(Input, parser) of
    Expected -> ok;
    Failed   ->
      io:format("~p~n", [Expected]),
      io:format("~p~n", [Failed]),
      failed
  end.


transform_module_test() ->
  Module = [{attribute,1,file,{"./monads.erl",1}},
            {attribute,1,module,monads},
            {attribute,2,compile,[]},
            {attribute,3,export,[{expr,0}]},
            {attribute,5,monad,parser},
            {function,6,expr,0,
             [{clause,6,[],[],
               [{match,7,{var,7,'A'},{call,7,{atom,7,char},[{char,7,97}]}},
                {match,8,{var,8,'B'},{call,8,{atom,8,char},[{char,8,98}]}},
                {call,9,{atom,9,return},[{tuple,9,[{var,9,'A'},{var,9,'B'}]}]}]}]},
            {eof,10}],
  Expected = [{attribute,1,file,{"./monads.erl",1}},
              {attribute,1,module,monads},
              {attribute,2,compile,[]},
              {attribute,3,export,[{expr,0}]},
              {function,6,expr,0,
               [{clause,6,[],[],
                 [{call,7,
                   {remote,7,{atom,7,parser},{atom,7,bind}},
                   [{call,7,{atom,7,char},[{char,7,97}]},
                    {'fun',7,
                     {clauses,
                      [{clause,7,
                        [{var,7,'A'}],
                        [],
                        [{call,8,
                          {remote,8,{atom,8,parser},{atom,8,bind}},
                          [{call,8,{atom,8,char},[{char,8,98}]},
                           {'fun',8,
                            {clauses,
                             [{clause,8,
                               [{var,8,'B'}],
                               [],
                               [{call,9,
                                 {remote,9,{atom,9,parser},{atom,9,return}},
                                 [{tuple,9,
                                   [{var,9,'A'},{var,9,'B'}]}]}]}]}}]}]}]}}]}]}]},
              {eof,10}],
  case parse_transform(Module, nil) of
    Expected -> ok;
    Failed   ->
      io:format("~p~n", [Expected]),
      io:format("~p~n", [Failed]),
      failed
  end.
