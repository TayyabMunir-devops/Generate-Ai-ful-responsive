import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import './Message.css';

/**
 * Message Component
 * Displays a single chat message with markdown support and syntax highlighting
 */
export const Message = ({ message, index, onDelete, onEdit, isEditing, onSaveEdit }) => {
  const isUser = message.role === 'user';
  const [editedContent, setEditedContent] = React.useState(message.content);

  const handleSaveEdit = () => {
    if (editedContent.trim()) {
      onSaveEdit(index, editedContent);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSaveEdit();
    }
    if (e.key === 'Escape') {
      setEditedContent(message.content);
      onEdit(null);
    }
  };

  return (
    <div className={`message message--${isUser ? 'user' : 'assistant'}`}>
      <div className="message__container">
        <div className="message__header">
          <span className="message__role">
            {isUser ? '👤 You' : '🤖 Assistant'}
          </span>
        </div>

        {isEditing ? (
          <div className="message__edit-mode">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="message__edit-input"
              autoFocus
            />
            <div className="message__edit-actions">
              <button
                onClick={handleSaveEdit}
                className="btn btn--primary btn--sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditedContent(message.content);
                  onEdit(null);
                }}
                className="btn btn--secondary btn--sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="message__content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <pre className={className}>
                      <code {...props}>{children}</code>
                    </pre>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                table: ({ children }) => (
                  <table className="markdown-table">{children}</table>
                ),
                thead: ({ children }) => (
                  <thead className="markdown-thead">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="markdown-tbody">{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr className="markdown-tr">{children}</tr>
                ),
                td: ({ children }) => (
                  <td className="markdown-td">{children}</td>
                ),
                th: ({ children }) => (
                  <th className="markdown-th">{children}</th>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {!isEditing && (
          <div className="message__actions">
            {!isUser && (
              <button
                onClick={() => onEdit(index)}
                className="message__action-btn"
                title="Edit message"
                aria-label="Edit message"
              >
                ✏️
              </button>
            )}
            <button
              onClick={() => onDelete(index)}
              className="message__action-btn message__action-btn--delete"
              title="Delete message"
              aria-label="Delete message"
            >
              🗑️
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(message.content);
              }}
              className="message__action-btn"
              title="Copy message"
              aria-label="Copy message"
            >
              📋
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
