// This is an auto-generated file. Do not edit.
// Run 'BALLERINA_HOME="your/ballerina/home" npm run gen-models' to generate.
import * as Ballerina from "./syntax-tree-interfaces";

export interface Visitor {
  beginVisitSTNode?(node: Ballerina.STNode, parent?: Ballerina.STNode): void;
  endVisitSTNode?(node: Ballerina.STNode, parent?: Ballerina.STNode): void;

  beginVisitAbstractKeyword?(
    node: Ballerina.AbstractKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitAbstractKeyword?(
    node: Ballerina.AbstractKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitActionStatement?(
    node: Ballerina.ActionStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitActionStatement?(
    node: Ballerina.ActionStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitAnnotation?(
    node: Ballerina.Annotation,
    parent?: Ballerina.STNode
  ): void;
  endVisitAnnotation?(
    node: Ballerina.Annotation,
    parent?: Ballerina.STNode
  ): void;

  beginVisitAnyKeyword?(
    node: Ballerina.AnyKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitAnyKeyword?(
    node: Ballerina.AnyKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitAnyTypeDesc?(
    node: Ballerina.AnyTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitAnyTypeDesc?(
    node: Ballerina.AnyTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitAnydataKeyword?(
    node: Ballerina.AnydataKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitAnydataKeyword?(
    node: Ballerina.AnydataKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitAnydataTypeDesc?(
    node: Ballerina.AnydataTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitAnydataTypeDesc?(
    node: Ballerina.AnydataTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitAssignmentStatement?(
    node: Ballerina.AssignmentStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitAssignmentStatement?(
    node: Ballerina.AssignmentStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitAsteriskToken?(
    node: Ballerina.AsteriskToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitAsteriskToken?(
    node: Ballerina.AsteriskToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitAtToken?(node: Ballerina.AtToken, parent?: Ballerina.STNode): void;
  endVisitAtToken?(node: Ballerina.AtToken, parent?: Ballerina.STNode): void;

  beginVisitBacktickToken?(
    node: Ballerina.BacktickToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitBacktickToken?(
    node: Ballerina.BacktickToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitBinaryExpression?(
    node: Ballerina.BinaryExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitBinaryExpression?(
    node: Ballerina.BinaryExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitBitwiseAndToken?(
    node: Ballerina.BitwiseAndToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitBitwiseAndToken?(
    node: Ballerina.BitwiseAndToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitBitwiseXorToken?(
    node: Ballerina.BitwiseXorToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitBitwiseXorToken?(
    node: Ballerina.BitwiseXorToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitBlockStatement?(
    node: Ballerina.BlockStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitBlockStatement?(
    node: Ballerina.BlockStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitBooleanKeyword?(
    node: Ballerina.BooleanKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitBooleanKeyword?(
    node: Ballerina.BooleanKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitBooleanTypeDesc?(
    node: Ballerina.BooleanTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitBooleanTypeDesc?(
    node: Ballerina.BooleanTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitBracedExpression?(
    node: Ballerina.BracedExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitBracedExpression?(
    node: Ballerina.BracedExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitByteKeyword?(
    node: Ballerina.ByteKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitByteKeyword?(
    node: Ballerina.ByteKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitByteTypeDesc?(
    node: Ballerina.ByteTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitByteTypeDesc?(
    node: Ballerina.ByteTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCallStatement?(
    node: Ballerina.CallStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitCallStatement?(
    node: Ballerina.CallStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCheckExpression?(
    node: Ballerina.CheckExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitCheckExpression?(
    node: Ballerina.CheckExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCheckKeyword?(
    node: Ballerina.CheckKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitCheckKeyword?(
    node: Ballerina.CheckKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCheckpanicKeyword?(
    node: Ballerina.CheckpanicKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitCheckpanicKeyword?(
    node: Ballerina.CheckpanicKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCloseBracePipeToken?(
    node: Ballerina.CloseBracePipeToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitCloseBracePipeToken?(
    node: Ballerina.CloseBracePipeToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCloseBraceToken?(
    node: Ballerina.CloseBraceToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitCloseBraceToken?(
    node: Ballerina.CloseBraceToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCloseBracketToken?(
    node: Ballerina.CloseBracketToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitCloseBracketToken?(
    node: Ballerina.CloseBracketToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCloseParenToken?(
    node: Ballerina.CloseParenToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitCloseParenToken?(
    node: Ballerina.CloseParenToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitColonToken?(
    node: Ballerina.ColonToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitColonToken?(
    node: Ballerina.ColonToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCommaToken?(
    node: Ballerina.CommaToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitCommaToken?(
    node: Ballerina.CommaToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitCompoundAssignmentStatement?(
    node: Ballerina.CompoundAssignmentStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitCompoundAssignmentStatement?(
    node: Ballerina.CompoundAssignmentStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitComputedNameField?(
    node: Ballerina.ComputedNameField,
    parent?: Ballerina.STNode
  ): void;
  endVisitComputedNameField?(
    node: Ballerina.ComputedNameField,
    parent?: Ballerina.STNode
  ): void;

  beginVisitConstDeclaration?(
    node: Ballerina.ConstDeclaration,
    parent?: Ballerina.STNode
  ): void;
  endVisitConstDeclaration?(
    node: Ballerina.ConstDeclaration,
    parent?: Ballerina.STNode
  ): void;

  beginVisitConstKeyword?(
    node: Ballerina.ConstKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitConstKeyword?(
    node: Ballerina.ConstKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitContinueKeyword?(
    node: Ballerina.ContinueKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitContinueKeyword?(
    node: Ballerina.ContinueKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitContinueStatement?(
    node: Ballerina.ContinueStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitContinueStatement?(
    node: Ballerina.ContinueStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitDecimalFloatingPointLiteral?(
    node: Ballerina.DecimalFloatingPointLiteral,
    parent?: Ballerina.STNode
  ): void;
  endVisitDecimalFloatingPointLiteral?(
    node: Ballerina.DecimalFloatingPointLiteral,
    parent?: Ballerina.STNode
  ): void;

  beginVisitDecimalIntegerLiteral?(
    node: Ballerina.DecimalIntegerLiteral,
    parent?: Ballerina.STNode
  ): void;
  endVisitDecimalIntegerLiteral?(
    node: Ballerina.DecimalIntegerLiteral,
    parent?: Ballerina.STNode
  ): void;

  beginVisitDocumentationLine?(
    node: Ballerina.DocumentationLine,
    parent?: Ballerina.STNode
  ): void;
  endVisitDocumentationLine?(
    node: Ballerina.DocumentationLine,
    parent?: Ballerina.STNode
  ): void;

  beginVisitDocumentationString?(
    node: Ballerina.DocumentationString,
    parent?: Ballerina.STNode
  ): void;
  endVisitDocumentationString?(
    node: Ballerina.DocumentationString,
    parent?: Ballerina.STNode
  ): void;

  beginVisitDotToken?(
    node: Ballerina.DotToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitDotToken?(node: Ballerina.DotToken, parent?: Ballerina.STNode): void;

  beginVisitDoubleEqualToken?(
    node: Ballerina.DoubleEqualToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitDoubleEqualToken?(
    node: Ballerina.DoubleEqualToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitEllipsisToken?(
    node: Ballerina.EllipsisToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitEllipsisToken?(
    node: Ballerina.EllipsisToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitElseBlock?(
    node: Ballerina.ElseBlock,
    parent?: Ballerina.STNode
  ): void;
  endVisitElseBlock?(
    node: Ballerina.ElseBlock,
    parent?: Ballerina.STNode
  ): void;

  beginVisitElseKeyword?(
    node: Ballerina.ElseKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitElseKeyword?(
    node: Ballerina.ElseKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitEofToken?(
    node: Ballerina.EofToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitEofToken?(node: Ballerina.EofToken, parent?: Ballerina.STNode): void;

  beginVisitEqualToken?(
    node: Ballerina.EqualToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitEqualToken?(
    node: Ballerina.EqualToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitErrorKeyword?(
    node: Ballerina.ErrorKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitErrorKeyword?(
    node: Ballerina.ErrorKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitErrorTypeDesc?(
    node: Ballerina.ErrorTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitErrorTypeDesc?(
    node: Ballerina.ErrorTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitExpressionListItem?(
    node: Ballerina.ExpressionListItem,
    parent?: Ballerina.STNode
  ): void;
  endVisitExpressionListItem?(
    node: Ballerina.ExpressionListItem,
    parent?: Ballerina.STNode
  ): void;

  beginVisitExternalFunctionBody?(
    node: Ballerina.ExternalFunctionBody,
    parent?: Ballerina.STNode
  ): void;
  endVisitExternalFunctionBody?(
    node: Ballerina.ExternalFunctionBody,
    parent?: Ballerina.STNode
  ): void;

  beginVisitExternalKeyword?(
    node: Ballerina.ExternalKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitExternalKeyword?(
    node: Ballerina.ExternalKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFalseKeyword?(
    node: Ballerina.FalseKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitFalseKeyword?(
    node: Ballerina.FalseKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFieldAccess?(
    node: Ballerina.FieldAccess,
    parent?: Ballerina.STNode
  ): void;
  endVisitFieldAccess?(
    node: Ballerina.FieldAccess,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFloatKeyword?(
    node: Ballerina.FloatKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitFloatKeyword?(
    node: Ballerina.FloatKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFloatTypeDesc?(
    node: Ballerina.FloatTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitFloatTypeDesc?(
    node: Ballerina.FloatTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitForeachKeyword?(
    node: Ballerina.ForeachKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitForeachKeyword?(
    node: Ballerina.ForeachKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitForeachStatement?(
    node: Ballerina.ForeachStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitForeachStatement?(
    node: Ballerina.ForeachStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFunctionBodyBlock?(
    node: Ballerina.FunctionBodyBlock,
    parent?: Ballerina.STNode
  ): void;
  endVisitFunctionBodyBlock?(
    node: Ballerina.FunctionBodyBlock,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFunctionCall?(
    node: Ballerina.FunctionCall,
    parent?: Ballerina.STNode
  ): void;
  endVisitFunctionCall?(
    node: Ballerina.FunctionCall,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFunctionDefinition?(
    node: Ballerina.FunctionDefinition,
    parent?: Ballerina.STNode
  ): void;
  endVisitFunctionDefinition?(
    node: Ballerina.FunctionDefinition,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFunctionKeyword?(
    node: Ballerina.FunctionKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitFunctionKeyword?(
    node: Ballerina.FunctionKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitFutureKeyword?(
    node: Ballerina.FutureKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitFutureKeyword?(
    node: Ballerina.FutureKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitGtEqualToken?(
    node: Ballerina.GtEqualToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitGtEqualToken?(
    node: Ballerina.GtEqualToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitGtToken?(node: Ballerina.GtToken, parent?: Ballerina.STNode): void;
  endVisitGtToken?(node: Ballerina.GtToken, parent?: Ballerina.STNode): void;

  beginVisitHandleKeyword?(
    node: Ballerina.HandleKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitHandleKeyword?(
    node: Ballerina.HandleKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitHandleTypeDesc?(
    node: Ballerina.HandleTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitHandleTypeDesc?(
    node: Ballerina.HandleTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitIdentifierToken?(
    node: Ballerina.IdentifierToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitIdentifierToken?(
    node: Ballerina.IdentifierToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitIfElseStatement?(
    node: Ballerina.IfElseStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitIfElseStatement?(
    node: Ballerina.IfElseStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitIfKeyword?(
    node: Ballerina.IfKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitIfKeyword?(
    node: Ballerina.IfKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitImportDeclaration?(
    node: Ballerina.ImportDeclaration,
    parent?: Ballerina.STNode
  ): void;
  endVisitImportDeclaration?(
    node: Ballerina.ImportDeclaration,
    parent?: Ballerina.STNode
  ): void;

  beginVisitImportKeyword?(
    node: Ballerina.ImportKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitImportKeyword?(
    node: Ballerina.ImportKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitImportOrgName?(
    node: Ballerina.ImportOrgName,
    parent?: Ballerina.STNode
  ): void;
  endVisitImportOrgName?(
    node: Ballerina.ImportOrgName,
    parent?: Ballerina.STNode
  ): void;

  beginVisitInKeyword?(
    node: Ballerina.InKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitInKeyword?(
    node: Ballerina.InKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitIndexedExpression?(
    node: Ballerina.IndexedExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitIndexedExpression?(
    node: Ballerina.IndexedExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitIntKeyword?(
    node: Ballerina.IntKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitIntKeyword?(
    node: Ballerina.IntKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitIntTypeDesc?(
    node: Ballerina.IntTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitIntTypeDesc?(
    node: Ballerina.IntTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitInvalid?(node: Ballerina.Invalid, parent?: Ballerina.STNode): void;
  endVisitInvalid?(node: Ballerina.Invalid, parent?: Ballerina.STNode): void;

  beginVisitIsKeyword?(
    node: Ballerina.IsKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitIsKeyword?(
    node: Ballerina.IsKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitListConstructor?(
    node: Ballerina.ListConstructor,
    parent?: Ballerina.STNode
  ): void;
  endVisitListConstructor?(
    node: Ballerina.ListConstructor,
    parent?: Ballerina.STNode
  ): void;

  beginVisitListenerDeclaration?(
    node: Ballerina.ListenerDeclaration,
    parent?: Ballerina.STNode
  ): void;
  endVisitListenerDeclaration?(
    node: Ballerina.ListenerDeclaration,
    parent?: Ballerina.STNode
  ): void;

  beginVisitListenerKeyword?(
    node: Ballerina.ListenerKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitListenerKeyword?(
    node: Ballerina.ListenerKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitLocalVarDecl?(
    node: Ballerina.LocalVarDecl,
    parent?: Ballerina.STNode
  ): void;
  endVisitLocalVarDecl?(
    node: Ballerina.LocalVarDecl,
    parent?: Ballerina.STNode
  ): void;

  beginVisitLockKeyword?(
    node: Ballerina.LockKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitLockKeyword?(
    node: Ballerina.LockKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitLockStatement?(
    node: Ballerina.LockStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitLockStatement?(
    node: Ballerina.LockStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitLtEqualToken?(
    node: Ballerina.LtEqualToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitLtEqualToken?(
    node: Ballerina.LtEqualToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitLtToken?(node: Ballerina.LtToken, parent?: Ballerina.STNode): void;
  endVisitLtToken?(node: Ballerina.LtToken, parent?: Ballerina.STNode): void;

  beginVisitMapKeyword?(
    node: Ballerina.MapKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitMapKeyword?(
    node: Ballerina.MapKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitMappingConstructor?(
    node: Ballerina.MappingConstructor,
    parent?: Ballerina.STNode
  ): void;
  endVisitMappingConstructor?(
    node: Ballerina.MappingConstructor,
    parent?: Ballerina.STNode
  ): void;

  beginVisitMetadata?(
    node: Ballerina.Metadata,
    parent?: Ballerina.STNode
  ): void;
  endVisitMetadata?(node: Ballerina.Metadata, parent?: Ballerina.STNode): void;

  beginVisitMethodCall?(
    node: Ballerina.MethodCall,
    parent?: Ballerina.STNode
  ): void;
  endVisitMethodCall?(
    node: Ballerina.MethodCall,
    parent?: Ballerina.STNode
  ): void;

  beginVisitMinusToken?(
    node: Ballerina.MinusToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitMinusToken?(
    node: Ballerina.MinusToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitModuleVarDecl?(
    node: Ballerina.ModuleVarDecl,
    parent?: Ballerina.STNode
  ): void;
  endVisitModuleVarDecl?(
    node: Ballerina.ModuleVarDecl,
    parent?: Ballerina.STNode
  ): void;

  beginVisitNamedArg?(
    node: Ballerina.NamedArg,
    parent?: Ballerina.STNode
  ): void;
  endVisitNamedArg?(node: Ballerina.NamedArg, parent?: Ballerina.STNode): void;

  beginVisitNamedWorkerDeclaration?(
    node: Ballerina.NamedWorkerDeclaration,
    parent?: Ballerina.STNode
  ): void;
  endVisitNamedWorkerDeclaration?(
    node: Ballerina.NamedWorkerDeclaration,
    parent?: Ballerina.STNode
  ): void;

  beginVisitNamedWorkerDeclarator?(
    node: Ballerina.NamedWorkerDeclarator,
    parent?: Ballerina.STNode
  ): void;
  endVisitNamedWorkerDeclarator?(
    node: Ballerina.NamedWorkerDeclarator,
    parent?: Ballerina.STNode
  ): void;

  beginVisitNilLiteral?(
    node: Ballerina.NilLiteral,
    parent?: Ballerina.STNode
  ): void;
  endVisitNilLiteral?(
    node: Ballerina.NilLiteral,
    parent?: Ballerina.STNode
  ): void;

  beginVisitNilTypeDesc?(
    node: Ballerina.NilTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitNilTypeDesc?(
    node: Ballerina.NilTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitNotDoubleEqualToken?(
    node: Ballerina.NotDoubleEqualToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitNotDoubleEqualToken?(
    node: Ballerina.NotDoubleEqualToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitObjectField?(
    node: Ballerina.ObjectField,
    parent?: Ballerina.STNode
  ): void;
  endVisitObjectField?(
    node: Ballerina.ObjectField,
    parent?: Ballerina.STNode
  ): void;

  beginVisitObjectKeyword?(
    node: Ballerina.ObjectKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitObjectKeyword?(
    node: Ballerina.ObjectKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitObjectTypeDesc?(
    node: Ballerina.ObjectTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitObjectTypeDesc?(
    node: Ballerina.ObjectTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitOnKeyword?(
    node: Ballerina.OnKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitOnKeyword?(
    node: Ballerina.OnKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitOpenBracePipeToken?(
    node: Ballerina.OpenBracePipeToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitOpenBracePipeToken?(
    node: Ballerina.OpenBracePipeToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitOpenBraceToken?(
    node: Ballerina.OpenBraceToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitOpenBraceToken?(
    node: Ballerina.OpenBraceToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitOpenBracketToken?(
    node: Ballerina.OpenBracketToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitOpenBracketToken?(
    node: Ballerina.OpenBracketToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitOpenParenToken?(
    node: Ballerina.OpenParenToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitOpenParenToken?(
    node: Ballerina.OpenParenToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitOptionalTypeDesc?(
    node: Ballerina.OptionalTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitOptionalTypeDesc?(
    node: Ballerina.OptionalTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitParameterizedTypeDesc?(
    node: Ballerina.ParameterizedTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitParameterizedTypeDesc?(
    node: Ballerina.ParameterizedTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitPipeToken?(
    node: Ballerina.PipeToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitPipeToken?(
    node: Ballerina.PipeToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitPlusToken?(
    node: Ballerina.PlusToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitPlusToken?(
    node: Ballerina.PlusToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitPositionalArg?(
    node: Ballerina.PositionalArg,
    parent?: Ballerina.STNode
  ): void;
  endVisitPositionalArg?(
    node: Ballerina.PositionalArg,
    parent?: Ballerina.STNode
  ): void;

  beginVisitPublicKeyword?(
    node: Ballerina.PublicKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitPublicKeyword?(
    node: Ballerina.PublicKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitQualifiedNameReference?(
    node: Ballerina.QualifiedNameReference,
    parent?: Ballerina.STNode
  ): void;
  endVisitQualifiedNameReference?(
    node: Ballerina.QualifiedNameReference,
    parent?: Ballerina.STNode
  ): void;

  beginVisitQuestionMarkToken?(
    node: Ballerina.QuestionMarkToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitQuestionMarkToken?(
    node: Ballerina.QuestionMarkToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitRawTemplateExpression?(
    node: Ballerina.RawTemplateExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitRawTemplateExpression?(
    node: Ballerina.RawTemplateExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitRecordField?(
    node: Ballerina.RecordField,
    parent?: Ballerina.STNode
  ): void;
  endVisitRecordField?(
    node: Ballerina.RecordField,
    parent?: Ballerina.STNode
  ): void;

  beginVisitRecordKeyword?(
    node: Ballerina.RecordKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitRecordKeyword?(
    node: Ballerina.RecordKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitRecordTypeDesc?(
    node: Ballerina.RecordTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitRecordTypeDesc?(
    node: Ballerina.RecordTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitRemoteMethodCallAction?(
    node: Ballerina.RemoteMethodCallAction,
    parent?: Ballerina.STNode
  ): void;
  endVisitRemoteMethodCallAction?(
    node: Ballerina.RemoteMethodCallAction,
    parent?: Ballerina.STNode
  ): void;

  beginVisitRequiredParam?(
    node: Ballerina.RequiredParam,
    parent?: Ballerina.STNode
  ): void;
  endVisitRequiredParam?(
    node: Ballerina.RequiredParam,
    parent?: Ballerina.STNode
  ): void;

  beginVisitResourceKeyword?(
    node: Ballerina.ResourceKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitResourceKeyword?(
    node: Ballerina.ResourceKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitRestParam?(
    node: Ballerina.RestParam,
    parent?: Ballerina.STNode
  ): void;
  endVisitRestParam?(
    node: Ballerina.RestParam,
    parent?: Ballerina.STNode
  ): void;

  beginVisitReturnKeyword?(
    node: Ballerina.ReturnKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitReturnKeyword?(
    node: Ballerina.ReturnKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitReturnStatement?(
    node: Ballerina.ReturnStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitReturnStatement?(
    node: Ballerina.ReturnStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitReturnTypeDescriptor?(
    node: Ballerina.ReturnTypeDescriptor,
    parent?: Ballerina.STNode
  ): void;
  endVisitReturnTypeDescriptor?(
    node: Ballerina.ReturnTypeDescriptor,
    parent?: Ballerina.STNode
  ): void;

  beginVisitReturnsKeyword?(
    node: Ballerina.ReturnsKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitReturnsKeyword?(
    node: Ballerina.ReturnsKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitRightArrowToken?(
    node: Ballerina.RightArrowToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitRightArrowToken?(
    node: Ballerina.RightArrowToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitSemicolonToken?(
    node: Ballerina.SemicolonToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitSemicolonToken?(
    node: Ballerina.SemicolonToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitServiceBody?(
    node: Ballerina.ServiceBody,
    parent?: Ballerina.STNode
  ): void;
  endVisitServiceBody?(
    node: Ballerina.ServiceBody,
    parent?: Ballerina.STNode
  ): void;

  beginVisitServiceDeclaration?(
    node: Ballerina.ServiceDeclaration,
    parent?: Ballerina.STNode
  ): void;
  endVisitServiceDeclaration?(
    node: Ballerina.ServiceDeclaration,
    parent?: Ballerina.STNode
  ): void;

  beginVisitServiceKeyword?(
    node: Ballerina.ServiceKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitServiceKeyword?(
    node: Ballerina.ServiceKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitSimpleNameReference?(
    node: Ballerina.SimpleNameReference,
    parent?: Ballerina.STNode
  ): void;
  endVisitSimpleNameReference?(
    node: Ballerina.SimpleNameReference,
    parent?: Ballerina.STNode
  ): void;

  beginVisitSlashToken?(
    node: Ballerina.SlashToken,
    parent?: Ballerina.STNode
  ): void;
  endVisitSlashToken?(
    node: Ballerina.SlashToken,
    parent?: Ballerina.STNode
  ): void;

  beginVisitSpecificField?(
    node: Ballerina.SpecificField,
    parent?: Ballerina.STNode
  ): void;
  endVisitSpecificField?(
    node: Ballerina.SpecificField,
    parent?: Ballerina.STNode
  ): void;

  beginVisitSpreadField?(
    node: Ballerina.SpreadField,
    parent?: Ballerina.STNode
  ): void;
  endVisitSpreadField?(
    node: Ballerina.SpreadField,
    parent?: Ballerina.STNode
  ): void;

  beginVisitStringKeyword?(
    node: Ballerina.StringKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitStringKeyword?(
    node: Ballerina.StringKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitStringLiteral?(
    node: Ballerina.StringLiteral,
    parent?: Ballerina.STNode
  ): void;
  endVisitStringLiteral?(
    node: Ballerina.StringLiteral,
    parent?: Ballerina.STNode
  ): void;

  beginVisitStringTypeDesc?(
    node: Ballerina.StringTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitStringTypeDesc?(
    node: Ballerina.StringTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitSyntaxTree?(
    node: Ballerina.SyntaxTree,
    parent?: Ballerina.STNode
  ): void;
  endVisitSyntaxTree?(
    node: Ballerina.SyntaxTree,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTemplateString?(
    node: Ballerina.TemplateString,
    parent?: Ballerina.STNode
  ): void;
  endVisitTemplateString?(
    node: Ballerina.TemplateString,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTrapExpression?(
    node: Ballerina.TrapExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitTrapExpression?(
    node: Ballerina.TrapExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTrapKeyword?(
    node: Ballerina.TrapKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitTrapKeyword?(
    node: Ballerina.TrapKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTrueKeyword?(
    node: Ballerina.TrueKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitTrueKeyword?(
    node: Ballerina.TrueKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTypeCastExpression?(
    node: Ballerina.TypeCastExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitTypeCastExpression?(
    node: Ballerina.TypeCastExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTypeCastParam?(
    node: Ballerina.TypeCastParam,
    parent?: Ballerina.STNode
  ): void;
  endVisitTypeCastParam?(
    node: Ballerina.TypeCastParam,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTypeDefinition?(
    node: Ballerina.TypeDefinition,
    parent?: Ballerina.STNode
  ): void;
  endVisitTypeDefinition?(
    node: Ballerina.TypeDefinition,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTypeDesc?(
    node: Ballerina.TypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitTypeDesc?(node: Ballerina.TypeDesc, parent?: Ballerina.STNode): void;

  beginVisitTypeKeyword?(
    node: Ballerina.TypeKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitTypeKeyword?(
    node: Ballerina.TypeKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitTypeTestExpression?(
    node: Ballerina.TypeTestExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitTypeTestExpression?(
    node: Ballerina.TypeTestExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitUnaryExpression?(
    node: Ballerina.UnaryExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitUnaryExpression?(
    node: Ballerina.UnaryExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitUnionTypeDesc?(
    node: Ballerina.UnionTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitUnionTypeDesc?(
    node: Ballerina.UnionTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitVarKeyword?(
    node: Ballerina.VarKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitVarKeyword?(
    node: Ballerina.VarKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitVarTypeDesc?(
    node: Ballerina.VarTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitVarTypeDesc?(
    node: Ballerina.VarTypeDesc,
    parent?: Ballerina.STNode
  ): void;

  beginVisitWhileKeyword?(
    node: Ballerina.WhileKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitWhileKeyword?(
    node: Ballerina.WhileKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitWhileStatement?(
    node: Ballerina.WhileStatement,
    parent?: Ballerina.STNode
  ): void;
  endVisitWhileStatement?(
    node: Ballerina.WhileStatement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitWorkerKeyword?(
    node: Ballerina.WorkerKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitWorkerKeyword?(
    node: Ballerina.WorkerKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitXmlElement?(
    node: Ballerina.XmlElement,
    parent?: Ballerina.STNode
  ): void;
  endVisitXmlElement?(
    node: Ballerina.XmlElement,
    parent?: Ballerina.STNode
  ): void;

  beginVisitXmlElementEndTag?(
    node: Ballerina.XmlElementEndTag,
    parent?: Ballerina.STNode
  ): void;
  endVisitXmlElementEndTag?(
    node: Ballerina.XmlElementEndTag,
    parent?: Ballerina.STNode
  ): void;

  beginVisitXmlElementStartTag?(
    node: Ballerina.XmlElementStartTag,
    parent?: Ballerina.STNode
  ): void;
  endVisitXmlElementStartTag?(
    node: Ballerina.XmlElementStartTag,
    parent?: Ballerina.STNode
  ): void;

  beginVisitXmlKeyword?(
    node: Ballerina.XmlKeyword,
    parent?: Ballerina.STNode
  ): void;
  endVisitXmlKeyword?(
    node: Ballerina.XmlKeyword,
    parent?: Ballerina.STNode
  ): void;

  beginVisitXmlTemplateExpression?(
    node: Ballerina.XmlTemplateExpression,
    parent?: Ballerina.STNode
  ): void;
  endVisitXmlTemplateExpression?(
    node: Ballerina.XmlTemplateExpression,
    parent?: Ballerina.STNode
  ): void;

  beginVisitXmlText?(node: Ballerina.XmlText, parent?: Ballerina.STNode): void;
  endVisitXmlText?(node: Ballerina.XmlText, parent?: Ballerina.STNode): void;

  beginVisitXmlTextContent?(
    node: Ballerina.XmlTextContent,
    parent?: Ballerina.STNode
  ): void;
  endVisitXmlTextContent?(
    node: Ballerina.XmlTextContent,
    parent?: Ballerina.STNode
  ): void;

  beginVisitXmlTypeDesc?(
    node: Ballerina.XmlTypeDesc,
    parent?: Ballerina.STNode
  ): void;
  endVisitXmlTypeDesc?(
    node: Ballerina.XmlTypeDesc,
    parent?: Ballerina.STNode
  ): void;
}
